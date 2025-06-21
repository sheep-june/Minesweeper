package com.inside.realty_inside_1002.board.payload;

import com.inside.realty_inside_1002.common.payload.MemberDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ReplyDto {

    private Long id;
    private String content;
    private String createdTime;
    private Long postId;
    private Long replyId;
    private MemberDto member;
    private List<ReplyDto> childReplies;

}
