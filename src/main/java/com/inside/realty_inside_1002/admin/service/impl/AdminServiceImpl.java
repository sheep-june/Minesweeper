package com.inside.realty_inside_1002.admin.service.impl;

import com.inside.realty_inside_1002.admin.service.AdminService;
import com.inside.realty_inside_1002.board.entity.RegionBoard;
import com.inside.realty_inside_1002.board.repository.RegionBoardRepository;
import com.inside.realty_inside_1002.common.entity.Member;
import com.inside.realty_inside_1002.common.payload.MemberDto;
import com.inside.realty_inside_1002.common.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service // 스프링 서비스 컴포넌트로 등록
@RequiredArgsConstructor // final 필드에 대한 생성자를 자동으로 생성 (Lombok)
@Slf4j // 로깅을 위한 Lombok 애노테이션
@Transactional // 트랜잭션 관리
public class AdminServiceImpl implements AdminService {

    private final MemberRepository memberRepository;
    private final RegionBoardRepository regionBoardRepository;

    @Override
    public ResponseEntity<List<MemberDto>> fetchManualAuthList() {

        List<Member> manualAuthMember = memberRepository.findByAddressAuthTrueAndRegionIsNull();

        List<MemberDto> memberDtos =
                manualAuthMember.stream()
                .map(member ->
                        MemberDto.builder()
                                .id(member.getId())
                                .email(member.getEmail())
                                .addressAuth(member.isAddressAuth())
                                .authCardSourcePath(member.getImageSourcePath())
                                .build())
                .toList();

        return ResponseEntity.ok(memberDtos);
    }

    @Override
    public ResponseEntity<List<MemberDto>> updateManualAuth(MemberDto memberDto) {

        Member member = memberRepository.findById(memberDto.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));


        boolean isExistRegion = regionBoardRepository.findByBoardName(memberDto.getRegion()).isPresent();

        if (isExistRegion) {
            member.setRegion(memberDto.getRegion());
        } else {
            RegionBoard regionBoard = RegionBoard.builder()
                    .boardName(memberDto.getRegion())
                    .createdTime(LocalDateTime.now())
                    .build();

            regionBoardRepository.save(regionBoard);

            member.setRegion(regionBoard.getBoardName());
        }

        memberRepository.save(member);

        return fetchManualAuthList();
    }

    @Override
    public ResponseEntity<List<MemberDto>> fetchTotalMemberList() {
        List<Member> memberList = memberRepository.findAll();
        return ResponseEntity.ok(memberList.stream()
                .map(member ->
                        MemberDto.builder()
                                .id(member.getId())
                                .email(member.getEmail())
                                .addressAuth(member.isAddressAuth())
                                .region(member.getRegion())
                                .registrationTime(member.getRegistrationTime().toString())
                                .build())
                .toList());
    }

    @Override
    public void deleteMember(String memberId) {
        Member member = memberRepository.findById(memberId).orElse(null);

        if (member == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        memberRepository.delete(member);
    }
}
