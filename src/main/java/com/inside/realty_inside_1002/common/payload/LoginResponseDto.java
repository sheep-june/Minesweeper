package com.inside.realty_inside_1002.common.payload;

import com.inside.realty_inside_1002.common.entity.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDto {
    private String id;
    private String token;
    private Role role;
    private String region;
    private String email;
}
