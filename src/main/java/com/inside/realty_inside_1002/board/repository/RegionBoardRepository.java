package com.inside.realty_inside_1002.board.repository;

import com.inside.realty_inside_1002.board.entity.RegionBoard;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RegionBoardRepository extends JpaRepository<RegionBoard, Long> {

    Optional<RegionBoard> findByBoardName(String boardName);

    @Query("SELECT rb FROM RegionBoard rb LEFT JOIN rb.posts p GROUP BY rb.id ORDER BY COUNT(p) DESC")
    List<RegionBoard> findTopRegionBoardsWithMostPosts(Pageable pageable);
}
