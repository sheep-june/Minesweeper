package com.inside.realty_inside_1002.common.controller;

import com.inside.realty_inside_1002.common.payload.*;
import com.inside.realty_inside_1002.common.service.impl.AuthServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthServiceImpl authService;

    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@ModelAttribute MemberDto memberDto) throws Exception {

        log.debug("signUp memberDto: {}", memberDto);

        return authService.signUp(memberDto);
    }

    @GetMapping("/checkId")
    public ResponseEntity<IdCheckDto> checkId(@RequestParam("id") String id) {
        log.debug("checkId: {}", id);

        return authService.checkId(id);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        log.debug("login loginRequestDto: {}", loginRequestDto);

        return authService.login(loginRequestDto);
    }

    @PostMapping("/adminLogin")
    public ResponseEntity<LoginResponseDto> adminLogin(@RequestBody LoginRequestDto loginRequestDto) {
        log.debug("adminLogin loginRequestDto: {}", loginRequestDto);
        return authService.adminLogin(loginRequestDto);
    }

    @GetMapping("/authTest")
    public ResponseEntity<?> getProtectedData(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            // 인증되지 않은 경우
            return ResponseEntity.status(HttpStatus.OK)
                    .body("인증되지 않은 사용자입니다. 인증 후 접근하세요.");
        } else {
            // 인증된 경우
            String username = authentication.getName();
            return ResponseEntity.ok("인증된 사용자 " + username + "의 데이터입니다.");
        }
    }

    @GetMapping("/verifiedToken")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DEVELOPER')")
    public ResponseEntity<LoginResponseDto> getVerifiedToken(Authentication authentication) {
        log.debug("getVerifiedToken");

        return authService.getVerifiedToken(authentication);
    }

    @PostMapping("/modifyPassword")
    public void modifyPassword(@RequestBody ModifyPasswordDto modifyPasswordDto) {
        log.debug("modifyPassword modifyPasswordDto: {}", modifyPasswordDto);
        authService.modifyPassword(modifyPasswordDto);
    }

}
