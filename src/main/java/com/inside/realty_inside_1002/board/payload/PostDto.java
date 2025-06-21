package com.inside.realty_inside_1002.board.payload;

import com.inside.realty_inside_1002.common.payload.MemberDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PostDto {

    private Long id;
    private String title;
    private String content;
    private String createdTime;
    private int likeCount;
    private int viewCount;
    private String boardType;
    private MemberDto member;
    private Long regionBoardId;
    private String regionBoardName;
    private String featuredImagePath;
    private List<ReplyDto> replies;

}
