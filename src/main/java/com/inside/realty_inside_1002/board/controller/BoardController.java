package com.inside.realty_inside_1002.board.controller;

import com.inside.realty_inside_1002.board.payload.PostDto;
import com.inside.realty_inside_1002.board.payload.RegionBoardDto;
import com.inside.realty_inside_1002.board.payload.ReplyDto;
import com.inside.realty_inside_1002.board.service.BoardService;
import com.inside.realty_inside_1002.board.service.impl.BoardServiceImpl;
import com.inside.realty_inside_1002.board.service.impl.PostServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/board")
public class BoardController {

    private final BoardServiceImpl boardService;
    private final PostServiceImpl postService;

    @GetMapping("/fetchRegionBoardList")
    public ResponseEntity<List<RegionBoardDto>> fetchRegionBoardList() {
        log.debug("fetchRegionBoardList");
        return boardService.fetchRegionBoardList();
    }

    @GetMapping("/fetchBoardPostList")
    public ResponseEntity<RegionBoardDto> fetchBoardPostList(@RequestParam(name = "boardId") Long boardId) {
        log.debug("fetchBoardPostList boardId: {}", boardId);
        return boardService.fetchBoardPostList(boardId);
    }

    @GetMapping("/fetchPostDetail")
    public ResponseEntity<PostDto> fetchPostDetail(@RequestParam(name = "postId") Long postId
    , @RequestParam(name = "memberId") String memberId) {
        log.debug("fetchPostDetail postId: {}", postId);
        log.debug("fetchPostDetail memberId: {}", memberId);
        postService.viewPost(postId, memberId);
        return boardService.fetchPostDetail(postId);
    }

    @PostMapping("/createBoardPost")
    public ResponseEntity<PostDto> createBoardPost(@RequestBody PostDto postDto) {
        log.debug("createBoardPost postDto: {}", postDto);
        return boardService.createBoardPost(postDto);
    }

    @GetMapping("/fetchBestRegionBoardList")
    public ResponseEntity<List<RegionBoardDto>> fetchBestRegionBoardList() {
        log.debug("fetchBestRegionBoardList");
        return boardService.fetchBestRegionBoardList();
    }

    @GetMapping("/fetchBestLikePostList")
    public ResponseEntity<List<PostDto>> fetchBestLikePostList() {
        log.debug("fetchBestLikePostList");
        return boardService.fetchBestLikePostList();
    }

    @PostMapping("/imageUpload")
    public ResponseEntity<String> imageUpload(@RequestParam("file") MultipartFile file) {
        log.debug("imageUpload file: {}", file);
        return boardService.imageUpload(file);
    }

    @GetMapping("/increasePostLike")
    public ResponseEntity<PostDto> increasePostLike(@RequestParam(name = "postId") Long postId,
                                                    @RequestParam(name = "memberId") String memberId) {
        log.debug("increasePostLike postId: {}", postId);
        log.debug("increasePostLike memberId: {}", memberId);

        postService.increasePostLike(postId, memberId);

        return boardService.fetchPostDetail(postId);
    }

    @PostMapping("/createReply")
    public ResponseEntity<PostDto> createReply(@RequestBody ReplyDto replyDto) {
        log.debug("createReply replyDto: {}", replyDto);
        return boardService.createReply(replyDto);
    }

    @GetMapping("/fetchNoticeBoardList")
    public ResponseEntity<List<PostDto>> fetchNoticeBoardList() {
        log.debug("fetchNoticeBoardList");
        return boardService.fetchNoticeBoardList();
    }

    @GetMapping("/searchPost")
    public ResponseEntity<List<PostDto>> searchPost(@RequestParam(name = "keyword") String keyword) {
        log.debug("searchPost keyword: {}", keyword);
        return boardService.searchPost(keyword);
    }
}
