package com.inside.realty_inside_1002.board.entity;

import com.inside.realty_inside_1002.common.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 제목
    private String title;

    // 상세 내용
    @Lob
    private String content;

    // 작성 시간
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    // 추천 수
    @Column(name = "like_count")
    private int likeCount;

    // 조회 수
    @Column(name = "view_count")
    private int viewCount;

    // 게시판 유형
    @Column(name = "board_type")
    private String boardType;

    // 대표 이미지 url
    @Column(name = "featured_image_path")
    private String featuredImagePath;

    // 지역 게시판과의 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_board_id")
    private RegionBoard regionBoard;

    // 작성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<PostView> postViews;

    // 댓글 리스트
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replies;

    public void increaseViewCount() {
        this.viewCount++;
    }

    public void increaseLikeCount() {
        this.likeCount++;
    }
}
