package com.inside.realty_inside_1002.board.service.impl;

import com.inside.realty_inside_1002.board.entity.Post;
import com.inside.realty_inside_1002.board.entity.RegionBoard;
import com.inside.realty_inside_1002.board.entity.Reply;
import com.inside.realty_inside_1002.board.payload.PostDto;
import com.inside.realty_inside_1002.board.payload.RegionBoardDto;
import com.inside.realty_inside_1002.board.payload.ReplyDto;
import com.inside.realty_inside_1002.board.repository.PostRepository;
import com.inside.realty_inside_1002.board.repository.RegionBoardRepository;
import com.inside.realty_inside_1002.board.repository.ReplyRepository;
import com.inside.realty_inside_1002.board.service.BoardService;
import com.inside.realty_inside_1002.common.entity.Member;
import com.inside.realty_inside_1002.common.exception.ResourceNotFoundException;
import com.inside.realty_inside_1002.common.payload.FileDto;
import com.inside.realty_inside_1002.common.payload.MemberDto;
import com.inside.realty_inside_1002.common.repository.MemberRepository;
import com.inside.realty_inside_1002.common.utils.FileUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service // 스프링 서비스 컴포넌트로 등록
@RequiredArgsConstructor // final 필드에 대한 생성자를 자동으로 생성 (Lombok)
@Slf4j // 로깅을 위한 Lombok 애노테이션
@Transactional // 트랜잭션 관리
public class BoardServiceImpl implements BoardService {

    private final RegionBoardRepository regionBoardRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final FileUtils fileUtils;
    private final ReplyRepository replyRepository;

    @Override
    public ResponseEntity<List<RegionBoardDto>> fetchRegionBoardList() {

        List<RegionBoard> regionBoardList = regionBoardRepository.findAll(Sort.by(Sort.Direction.ASC, "boardName"));

        if (regionBoardList.isEmpty()) {
            return null;
        }
        List<RegionBoardDto> regionBoardDtoList = regionBoardList.stream()
                .map(regionBoard -> RegionBoardDto.builder()
                        .id(regionBoard.getId())
                        .boardName(regionBoard.getBoardName())
                        .createdTime(regionBoard.getCreatedTime().toString())
                        .build())
                .toList();

        return ResponseEntity.ok(regionBoardDtoList);
    }

    @Override
    public ResponseEntity<RegionBoardDto> fetchBoardPostList(Long boardId) {

        RegionBoard regionBoard = regionBoardRepository.findById(boardId)
                .orElseThrow(() -> new ResourceNotFoundException("RegionBoard", "id", boardId.toString()));

        RegionBoardDto regionBoardDto = convertToRegionBoardDto(regionBoard);

        return ResponseEntity.ok(regionBoardDto);
    }

    @Override
    public ResponseEntity<PostDto> fetchPostDetail(Long postId) {
        log.debug(postId.toString());
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            throw new ResourceNotFoundException("Post", "id", postId.toString());
        }

        PostDto postDto = convertToPostDto(post);

        return ResponseEntity.ok(postDto);
    }

    @Override
    public ResponseEntity<PostDto> createBoardPost(PostDto postDto) {
        String memberId = postDto.getMember().getId();

        Member member = memberRepository.findById(memberId).orElse(null);
        if (member == null) {
            throw new ResourceNotFoundException("member", "id", postDto.getId());
        }

        RegionBoard regionBoard = regionBoardRepository.findByBoardName(postDto.getRegionBoardName()).orElse(null);

        if (regionBoard == null) {
            throw new ResourceNotFoundException("RegionBoard", "name", postDto.getRegionBoardName());
        }

        Post post = Post.builder()
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .createdTime(LocalDateTime.now())
                .likeCount(0)
                .viewCount(0)
                .boardType(postDto.getBoardType())
                .regionBoard(regionBoard)
                .member(member)
                .featuredImagePath(postDto.getFeaturedImagePath())
                .build();

        postRepository.save(post);

        return ResponseEntity.ok(convertToPostDto(post));
    }

    @Override
    public ResponseEntity<List<RegionBoardDto>> fetchBestRegionBoardList() {

        List<RegionBoard> regionBoards =
                regionBoardRepository
                        .findTopRegionBoardsWithMostPosts(PageRequest.of(0, 10));

        if (regionBoards.isEmpty()) {
            return null;
        }

        return ResponseEntity.ok(
                regionBoards.stream()
                        .map(this::convertToRegionBoardDto)
                        .toList());
    }

    @Override
    public ResponseEntity<List<PostDto>> fetchBestLikePostList() {

        List<Post> posts = postRepository.findTop10PostsByOrderByLikeCountDesc(PageRequest.of(0, 10));

        log.debug(String.valueOf(posts.size()));

        if (posts.isEmpty()) {
            return null;
        }

        return ResponseEntity.ok(posts.stream().map(this::convertToPostDto).toList());
    }

    @Override
    public ResponseEntity<String> imageUpload(MultipartFile file) {

        List<MultipartFile> files = new ArrayList<>();
        files.add(file);

        try {
            List<FileDto> fileDtos = fileUtils.parseFileInfo(files);

            if (fileDtos.isEmpty()) {
                return ResponseEntity.badRequest().body("사진 업로드에 실패했습니다.");
            }

            FileDto fileDto = fileDtos.get(0);

            return ResponseEntity.ok(fileDto.getImageSourcePath());
        } catch (Exception e) {
            log.error("사진 업로드 중 오류 발생: ", e);
            return ResponseEntity.status(500).body("사진 업로드 중 오류가 발생했습니다.");
        }
    }

    @Override
    public ResponseEntity<PostDto> createReply(ReplyDto replyDto) {
        Member member = memberRepository.findById(replyDto.getMember().getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Member", "id", replyDto.getMember().getId().toString()));

        Long refreshedPostId;

        if (replyDto.getReplyId() == null) {
            Post post = postRepository.findById(replyDto.getPostId())
                    .orElseThrow(() -> new ResourceNotFoundException("Post", "id", replyDto.getPostId().toString()));

            Reply reply = Reply.builder()
                    .content(replyDto.getContent())
                    .createdTime(LocalDateTime.now())
                    .post(post)
                    .member(member)
                    .build();

            refreshedPostId = replyDto.getPostId();

            replyRepository.save(reply);
        } else {
            Reply reply = replyRepository.findById(replyDto.getReplyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Reply", "id", replyDto.getReplyId().toString()));

            Reply childReply = Reply.builder()
                    .content(replyDto.getContent())
                    .createdTime(LocalDateTime.now())
                    .post(reply.getPost())
                    .parentReply(reply)
                    .member(member)
                    .build();

            refreshedPostId = childReply.getPost().getId();

            replyRepository.save(childReply);
        }
        return fetchPostDetail(refreshedPostId);
    }

    @Override
    public ResponseEntity<List<PostDto>> fetchNoticeBoardList() {

        List<Post> posts = postRepository.findByBoardType("공지");

        if (posts == null) {
            return null;
        }

        return ResponseEntity.ok(posts.stream().map(this::convertToPostDto).toList());
    }

    @Override
    public ResponseEntity<List<PostDto>> searchPost(String keyword) {
        List<Post> posts = postRepository.searchPostsByTitleOrContent(keyword);

        if (posts == null) {
            return null;
        }

        return ResponseEntity.ok(posts.stream().map(this::convertToPostDto).toList());
    }

    private RegionBoardDto convertToRegionBoardDto(RegionBoard regionBoard) {
        RegionBoardDto.RegionBoardDtoBuilder builder = RegionBoardDto.builder()
                .id(regionBoard.getId())
                .boardName(regionBoard.getBoardName())
                .createdTime(regionBoard.getCreatedTime().toString());

        if (regionBoard.getPosts() != null) {
            builder.posts(regionBoard.getPosts().stream()
                    .map(this::convertToPostDto)
                    .collect(Collectors.toList()));
        }

        return builder.build();
    }

    private PostDto convertToPostDto(Post post) {
        PostDto.PostDtoBuilder builder = PostDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .createdTime(post.getCreatedTime().toString())
                .likeCount(post.getLikeCount())
                .viewCount(post.getViewCount())
                .boardType(post.getBoardType())
                .member(convertToMemberDto(post.getMember()))
                .regionBoardId(post.getRegionBoard().getId())
                .regionBoardName(post.getRegionBoard().getBoardName())
                .featuredImagePath(post.getFeaturedImagePath());

        if (post.getReplies() != null) {
            builder.replies(post.getReplies().stream()
                    .filter(reply -> reply.getParentReply() == null)
                    .map(this::convertToReplyDto)
                    .collect(Collectors.toList()));
        }

            return builder.build();
    }

    private ReplyDto convertToReplyDto(Reply reply) {
        return ReplyDto.builder()
                .id(reply.getId())
                .content(reply.getContent())
                .createdTime(reply.getCreatedTime().toString())
                .member(convertToMemberDto(reply.getMember()))
                .childReplies(reply.getChildReplies() != null ?
                        reply.getChildReplies().stream()
                                .map(this::convertToReplyDto)
                                .collect(Collectors.toList()) : null)
                .build();
    }

    private MemberDto convertToMemberDto(Member member) {
        return MemberDto.builder()
                .id(member.getId())
                .build();
    }
}
