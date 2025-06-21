package com.inside.realty_inside_1002.common.service;

import com.inside.realty_inside_1002.common.payload.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface AuthService {
    ResponseEntity<String> signUp(MemberDto memberDto) throws Exception;

    ResponseEntity<IdCheckDto> checkId(String id);

    ResponseEntity<LoginResponseDto> login(LoginRequestDto loginRequestDto);

    ResponseEntity<LoginResponseDto> adminLogin(LoginRequestDto loginRequestDto);

    ResponseEntity<LoginResponseDto> getVerifiedToken(Authentication authentication);

    void modifyPassword(ModifyPasswordDto modifyPasswordDto);
}
