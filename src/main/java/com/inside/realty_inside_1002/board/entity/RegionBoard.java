package com.inside.realty_inside_1002.board.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "region_board")
public class RegionBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "board_name")
    private String boardName;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @OneToMany(mappedBy = "regionBoard", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;
}
