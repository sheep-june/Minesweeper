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
@Table(name = "reply")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 댓글 내용
    @Lob
    private String content;

    // 작성 시간
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    // 원본 게시글과의 관계 (최상위 댓글인 경우)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    // 부모 댓글과의 관계 (대댓글 기능을 위한 자기 참조 관계)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_reply_id")
    private Reply parentReply;

    // 작성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 자식 댓글 리스트 (해당 댓글에 달린 답글)
    @OneToMany(mappedBy = "parentReply", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> childReplies;
}
