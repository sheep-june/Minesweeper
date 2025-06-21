package com.inside.realty_inside_1002.board.repository;

import com.inside.realty_inside_1002.board.entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findTop10PostsByOrderByLikeCountDesc(Pageable pageable);

    List<Post> findByBoardType(String boardType);

    @Query("SELECT p FROM Post p WHERE (p.title LIKE %:keyword% OR p.content LIKE %:keyword%) ORDER BY p.createdTime DESC")
    List<Post> searchPostsByTitleOrContent(@Param("keyword") String keyword);
}
