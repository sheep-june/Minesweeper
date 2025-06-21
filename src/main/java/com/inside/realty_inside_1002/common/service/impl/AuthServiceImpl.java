package com.inside.realty_inside_1002.common.service.impl;

import com.inside.realty_inside_1002.common.entity.Member;
import com.inside.realty_inside_1002.common.entity.Role;
import com.inside.realty_inside_1002.common.payload.*;
import com.inside.realty_inside_1002.common.repository.MemberRepository;
import com.inside.realty_inside_1002.common.security.JwtTokenProvider;
import com.inside.realty_inside_1002.common.service.AuthService;
import com.inside.realty_inside_1002.common.utils.FileUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service // 스프링 서비스 컴포넌트로 등록
@RequiredArgsConstructor // final 필드에 대한 생성자를 자동으로 생성 (Lombok)
@Slf4j // 로깅을 위한 Lombok 애노테이션
@Transactional // 트랜잭션 관리
public class AuthServiceImpl implements AuthService {

    private final MemberRepository memberRepository; // 회원 정보를 관리하는 레포지토리
    private final PasswordEncoder passwordEncoder; // 비밀번호 암호화를 위한 PasswordEncoder
    private final FileUtils fileUtils; // 파일 관련 유틸리티 클래스
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 회원 가입을 처리하는 메서드.
     *
     * @param memberDto 회원 가입 정보가 담긴 DTO
     * @return 회원 가입 성공 여부에 대한 응답
     */
    @Override
    public ResponseEntity<String> signUp(MemberDto memberDto) {
        try {
            // 비밀번호 암호화
            String encodedPassword = passwordEncoder.encode(memberDto.getPassword());

            // 업로드된 ID 카드 이미지를 리스트로 변환
            List<MultipartFile> files = Collections.singletonList(memberDto.getIdCardImage());

            // 파일 정보를 파싱하여 저장
            List<FileDto> fileDtos = fileUtils.parseFileInfo(files);
            if (fileDtos.isEmpty()) {
                return ResponseEntity.badRequest().body("파일 업로드에 실패했습니다.");
            }
            FileDto fileDto = fileDtos.get(0);

            // 회원 정보 빌더를 사용하여 Member 객체 생성
            Member.MemberBuilder memberBuilder = Member.builder()
                    .id(memberDto.getId())
                    .password(encodedPassword)
                    .email(memberDto.getEmail())
                    .addressAuth(memberDto.isAddressAuth())
                    .originalFileName(fileDto.getOriginalFileName())
                    .imageSourcePath(fileDto.getImageSourcePath())
                    .storedFilePath(fileDto.getStoredFilePath())
                    .fileSize(fileDto.getFileSize())
                    .registrationTime(LocalDateTime.now());

            // 주소 인증 여부에 따라 역할 설정
            if (memberDto.isAddressAuth()) {
                memberBuilder.role(Role.GUEST);
            }

            // 회원 정보 저장
            memberRepository.save(memberBuilder.build());

            return ResponseEntity.ok("회원 가입에 성공했습니다.");
        } catch (Exception e) {
            log.error("회원 가입 중 예외 발생: ", e);
            return ResponseEntity.status(500).body("회원 가입 중 오류가 발생했습니다.");
        }
    }

    /**
     * 사용자 ID의 중복 여부를 확인하는 메서드.
     *
     * @param id 중복 확인할 사용자 ID
     * @return ID 중복 여부에 대한 응답 DTO
     */
    @Override
    public ResponseEntity<IdCheckDto> checkId(String id) {
        boolean exists = memberRepository.findById(id).isPresent();
        return ResponseEntity.ok(IdCheckDto.builder().exists(exists).build());
    }

    @Override
    public ResponseEntity<LoginResponseDto> login(LoginRequestDto loginRequestDto) {
        // 사용자 조회
        Member member = memberRepository.findById(loginRequestDto.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        return ResponseEntity.ok(getLoginResponseDto(member, loginRequestDto));
    }

    @Override
    public ResponseEntity<LoginResponseDto> adminLogin(LoginRequestDto loginRequestDto) {
        // 사용자 조회
        Member member = memberRepository.findById(loginRequestDto.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        if (member.getRole() != Role.ADMIN) new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");

        // 응답 DTO 생성
        return ResponseEntity.ok(getLoginResponseDto(member, loginRequestDto));
    }

    @Override
    public ResponseEntity<LoginResponseDto> getVerifiedToken(Authentication authentication) {
        String memberId = authentication.getName();

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        return ResponseEntity.ok(LoginResponseDto.builder()
                .id(member.getId())
                .role(member.getRole())
                .build());
    }

    @Override
    public void modifyPassword(ModifyPasswordDto modifyPasswordDto) {
        Member member = memberRepository.findById(modifyPasswordDto.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        // 비밀번호 검증
        if (!passwordEncoder.matches(modifyPasswordDto.getCurrentPassword(), member.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        String encodedPassword = passwordEncoder.encode(modifyPasswordDto.getNewPassword());

        member.modifyPassword(encodedPassword);
        memberRepository.save(member);

    }

    private LoginResponseDto getLoginResponseDto(Member member, LoginRequestDto loginRequestDto) {
        // 비밀번호 검증
        if (!passwordEncoder.matches(loginRequestDto.getPassword(), member.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        // JWT 토큰 생성
        String token = jwtTokenProvider.generateToken(member);

        LoginResponseDto.LoginResponseDtoBuilder builder = LoginResponseDto.builder()
                .id(member.getId())
                .role(member.getRole())
                .token(token)
                .email(member.getEmail());

        if (member.getRegion() != null) {
            builder.region(member.getRegion());
        }

        return builder.build();
    }


}