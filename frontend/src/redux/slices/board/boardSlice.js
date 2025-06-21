import { createSlice } from '@reduxjs/toolkit';
import {
  createBoardPost,
  deletePost,
  fetchBestLikePostList,
  fetchBestRegionBoardList,
  fetchBoardPostList,
  fetchNoticeBoardList,
  fetchPostDetail,
  fetchTotalBoardList,
  increasePostLike,
  modifyBoardPost,
  searchPost,
} from './boardThunk.js';

const initialState = {
  totalBoardList: null,
  regionBoard: { id: 0, boardName: '', createdTime: '', posts: [] },
  postDetail: {
    id: 0,
    title: '',
    content: '',
    createdTime: '',
    likeCount: 0,
    viewCount: 0,
    boardType: '',
    member: { id: '' },
    regionBoardId: 0,
    regionBoardName: '',
    replies: [],
  },
  bestRegionBoardList: [],
  bestLikePostList: [],
  noticeBoardList: [],
  searchPostList: [],
  isLoading: false,
  error: null,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalBoardList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotalBoardList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalBoardList = action.payload;
      })
      .addCase(fetchTotalBoardList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload.message || '전체 게시판 리스트 갱신에 실패했습니다.';
      })
      .addCase(fetchBoardPostList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBoardPostList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.regionBoard = action.payload;
      })
      .addCase(fetchBoardPostList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload.message || '지역게시판 글 리스트 갱신에 실패했습니다.';
      })
      .addCase(fetchPostDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postDetail = action.payload;
      })
      .addCase(fetchPostDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || '게시글 갱신에 실패했습니다.';
      })
      .addCase(createBoardPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBoardPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postDetail = action.payload;
      })
      .addCase(createBoardPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '게시글 생성에 실패했습니다.';
      })
      .addCase(modifyBoardPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(modifyBoardPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postDetail = action.payload;
      })
      .addCase(modifyBoardPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '게시글 생성에 실패했습니다.';
      })
      .addCase(fetchBestRegionBoardList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBestRegionBoardList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bestRegionBoardList = action.payload;
      })
      .addCase(fetchBestRegionBoardList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '게시글 생성에 실패했습니다.';
      })
      .addCase(fetchBestLikePostList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBestLikePostList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bestLikePostList = action.payload;
      })
      .addCase(fetchBestLikePostList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '게시글 생성에 실패했습니다.';
      })
      .addCase(increasePostLike.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(increasePostLike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postDetail = action.payload;
      })
      .addCase(increasePostLike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '추천하기에 실패했습니다.';
      })
      .addCase(fetchNoticeBoardList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNoticeBoardList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.noticeBoardList = action.payload;
      })
      .addCase(fetchNoticeBoardList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '데이터 불러오기에 실패했습니다.';
      })
      .addCase(searchPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchPostList = action.payload;
      })
      .addCase(searchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '데이터 불러오기에 실패했습니다.';
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '데이터 불러오기에 실패했습니다.';
      });
  },
});

export default boardSlice.reducer;
