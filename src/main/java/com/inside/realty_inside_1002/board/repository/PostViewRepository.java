package com.inside.realty_inside_1002.board.repository;

import com.inside.realty_inside_1002.board.entity.Post;
import com.inside.realty_inside_1002.board.entity.PostView;
import com.inside.realty_inside_1002.common.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface PostViewRepository extends JpaRepository<PostView, Long> {

    Optional<PostView> findTopByPostAndMemberAndViewTimeAfter(Post post, Member member, LocalDateTime afterTime);

    Optional<PostView> findTopByPostAndIpAddressAndSessionIdAndViewTimeAfter(Post post, String ipAddress, String sessionId, LocalDateTime afterTime);
}
