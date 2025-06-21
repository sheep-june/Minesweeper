package com.inside.realty_inside_1002.board.service.impl;

import com.inside.realty_inside_1002.board.entity.Post;
import com.inside.realty_inside_1002.board.entity.PostLike;
import com.inside.realty_inside_1002.board.entity.PostView;
import com.inside.realty_inside_1002.board.repository.PostLikeRepository;
import com.inside.realty_inside_1002.board.repository.PostRepository;
import com.inside.realty_inside_1002.board.repository.PostViewRepository;
import com.inside.realty_inside_1002.board.service.PostService;
import com.inside.realty_inside_1002.common.entity.Member;
import com.inside.realty_inside_1002.common.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service // 스프링 서비스 컴포넌트로 등록
@RequiredArgsConstructor // final 필드에 대한 생성자를 자동으로 생성 (Lombok)
@Slf4j // 로깅을 위한 Lombok 애노테이션
@Transactional // 트랜잭션 관리
public class PostServiceImpl implements PostService {

    private static final int VIEW_LIMIT_MINUTES = 60; // 조회 제한 시간 (예: 60분)

    private final PostRepository postRepository;

    private final PostViewRepository postViewRepository;
    private final MemberRepository memberRepository;
    private final HttpServletRequest request;
    private final PostLikeRepository postLikeRepository;

    public void increasePostLike(Long postId, String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(RuntimeException::new);
        Post post = postRepository.findById(postId).orElseThrow(RuntimeException::new);

        boolean canIncreaseLike = postLikeRepository.findByPostAndMember(post, member).isEmpty();

        if (canIncreaseLike) {
            post.increaseLikeCount();
            postRepository.save(post);

            PostLike postLike = PostLike.builder()
                    .post(post)
                    .member(member)
                    .likeTime(LocalDateTime.now())
                    .build();

            postLikeRepository.save(postLike);
        }
    }

    /**
     * 게시물 조회 시 조회수 증가를 제한하는 메서드
     * @param postId 조회할 게시물 ID
     * @param memberId 조회한 사용자 ID
     */
    public void viewPost(Long postId, String memberId) {
        Member member = memberRepository.findById(memberId).orElse(null);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시물입니다."));

        LocalDateTime afterTime = LocalDateTime.now().minusMinutes(VIEW_LIMIT_MINUTES);

        boolean canIncrement = false;

        if (member != null) {
            canIncrement = postViewRepository.findTopByPostAndMemberAndViewTimeAfter(post, member, afterTime).isEmpty();

            if (canIncrement) {
                post.increaseViewCount();
                postRepository.save(post);

                PostView postView = PostView.builder()
                        .post(post)
                        .member(member)
                        .viewTime(LocalDateTime.now())
                        .build();
                postViewRepository.save(postView);
            }
        }else { // 비로그인 사용자
            String ipAddress = getClientIpAddress();
            String sessionId = request.getSession().getId();

            canIncrement = postViewRepository.findTopByPostAndIpAddressAndSessionIdAndViewTimeAfter(post, ipAddress, sessionId, afterTime).isEmpty();
            if (canIncrement) {
                // 조회수 증가
                post.increaseViewCount();
                postRepository.save(post);

                // 조회 기록 저장
                PostView postView = PostView.builder()
                        .post(post)
                        .ipAddress(ipAddress)
                        .sessionId(sessionId)
                        .viewTime(LocalDateTime.now())
                        .build();
                postViewRepository.save(postView);
            }
        }
    }

    private String getClientIpAddress() {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}
