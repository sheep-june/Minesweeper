package com.inside.realty_inside_1002.board.service;

import com.inside.realty_inside_1002.board.payload.PostDto;
import com.inside.realty_inside_1002.board.payload.RegionBoardDto;
import com.inside.realty_inside_1002.board.payload.ReplyDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardService {
    ResponseEntity<List<RegionBoardDto>> fetchRegionBoardList();

    ResponseEntity<RegionBoardDto> fetchBoardPostList(Long boardId);

    ResponseEntity<PostDto> fetchPostDetail(Long postId);

    ResponseEntity<PostDto> createBoardPost(PostDto postDto);

    ResponseEntity<List<RegionBoardDto>> fetchBestRegionBoardList();

    ResponseEntity<List<PostDto>> fetchBestLikePostList();

    ResponseEntity<String> imageUpload(MultipartFile file);

    ResponseEntity<PostDto> createReply(ReplyDto replyDto);

    ResponseEntity<List<PostDto>> fetchNoticeBoardList();

    ResponseEntity<List<PostDto>> searchPost(String keyword);
}
