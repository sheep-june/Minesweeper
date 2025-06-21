package com.inside.realty_inside_1002.common.payload;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class MemberDto {

    private String id;
    private String password;
    private String email;
    private String address;
    private boolean addressAuth;
    private String region;
    private MultipartFile idCardImage;
    private String authCardSourcePath;
    private String registrationTime;

}
