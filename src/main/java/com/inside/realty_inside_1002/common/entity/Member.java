package com.inside.realty_inside_1002.common.entity;

import com.inside.realty_inside_1002.board.entity.Post;
import com.inside.realty_inside_1002.board.entity.Reply;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
public class Member {

    @Id
    private String id;

    @Column(name = "password", length = 1000)
    private String password;

    @Column(name = "email", length = 100, unique = true)
    private String email;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "address_auth")
    private boolean addressAuth;

    @Column(name = "region", length = 200)
    private String region;

    @Column(name = "original_file_name")
    private String originalFileName;

    @Column(name = "stored_file_path", length = 500)
    private String storedFilePath;

    @Column(name = "image_source_path", length = 500)
    private String imageSourcePath;

    @Column(name = "file_size")
    private Long fileSize;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Column(name = "registration_time", nullable = false)
    private LocalDateTime registrationTime;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Post> posts;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Reply> replies;

    public void setRegion(String region) {
        this.region = region;
    }

    public void modifyPassword(String password) {
        this.password = password;
    }


}
