package com.inside.realty_inside_1002.board.repository;

import com.inside.realty_inside_1002.board.entity.Post;
import com.inside.realty_inside_1002.board.entity.PostLike;
import com.inside.realty_inside_1002.common.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    Optional<PostLike> findByPostAndMember(Post post, Member member);
}
