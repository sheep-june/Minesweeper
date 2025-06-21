package com.inside.realty_inside_1002.board.payload;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RegionBoardDto {

    private Long id;
    private String boardName;
    private String createdTime;
    private List<PostDto> posts;

}
