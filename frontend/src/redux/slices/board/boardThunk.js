// 비동기 액션: 전체 지역 게시판 목록 가져오기
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createBoardPostApi,
  deletePostApi,
  fetchBestLikePostListApi,
  fetchBestRegionBoardListApi,
  fetchBoardPostListApi,
  fetchNoticeBoardListApi,
  fetchPostDetailApi,
  fetchTotalBoardListApi,
  increasePostLikeApi,
  modifyBoardPostApi,
  searchPostApi,
} from '../../api/board/boardApi.js';

export const fetchTotalBoardList = createAsyncThunk(
  'board/fetchTotalBoardList',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTotalBoardListApi();
    } catch (error) {
      return rejectWithValue(
        error.message || '데이터 불러오기 오류가 발생했습니다.',
      );
    }
  },
);

export const fetchBoardPostList = createAsyncThunk(
  'board/fetchBoardPostList',
  async (boardId, { rejectWithValue }) => {
    try {
      return await fetchBoardPostListApi(boardId);
    } catch (error) {
      return rejectWithValue(
        error.message || '데이터 불러오기 오류가 발생했습니다.',
      );
    }
  },
);

export const fetchPostDetail = createAsyncThunk(
  'board/fetchPostDetail',
  async ({ postId, memberId }, { rejectWithValue }) => {
    try {
      return await fetchPostDetailApi({ postId, memberId });
    } catch (error) {
      return rejectWithValue(
        error.message || '데이터 불러오기 오류가 발생했습니다.',
      );
    }
  },
);

export const createBoardPost = createAsyncThunk(
  'board/createBoardPost',
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      return await createBoardPostApi({ formData, token });
    } catch (error) {
      if (error.message === 'JWT_EXPIRED') {
        // JWT 만료 에러를 식별하여 특정 에러를 반환합니다.
        return rejectWithValue('JWT_EXPIRED');
      }
      return rejectWithValue(
        error.message || '게시물 업로드 중 오류가 발생했습니다.',
      );
    }
  },
);

export const modifyBoardPost = createAsyncThunk(
  'board/modifyBoardPost',
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      return await modifyBoardPostApi({ formData, token });
    } catch (error) {
      if (error.message === 'JWT_EXPIRED') {
        // JWT 만료 에러를 식별하여 특정 에러를 반환합니다.
        return rejectWithValue('JWT_EXPIRED');
      }
      return rejectWithValue(
        error.message || '게시물 업로드 중 오류가 발생했습니다.',
      );
    }
  },
);

export const fetchBestRegionBoardList = createAsyncThunk(
  'board/fetchBestRegionBoardList',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchBestRegionBoardListApi();
    } catch (error) {
      return rejectWithValue(
        error.message || '데이터 불러오기 오류가 발생했습니다.',
      );
    }
  },
);

export const fetchBestLikePostList = createAsyncThunk(
  'board/fetchBestLikePostList',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchBestLikePostListApi();
    } catch (error) {
      return rejectWithValue(
        error.message || '데이터 불러오기 오류가 발생했습니다.',
      );
    }
  },
);

export const increasePostLike = createAsyncThunk(
  'board/increasePostLike',
  async ({ postId, memberId, token }, { rejectWithValue }) => {
    try {
      return await increasePostLikeApi({ postId, memberId, token });
    } catch (error) {
      if (error.message === 'JWT_EXPIRED') {
        // JWT 만료 에러를 식별하여 특정 에러를 반환합니다.
        return rejectWithValue('JWT_EXPIRED');
      }

      return rejectWithValue(
        error.message || '추천하기 중 오류가 발생했습니다.',
      );
    }
  },
);

export const fetchNoticeBoardList = createAsyncThunk(
  'board/fetchNoticeBoardList',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchNoticeBoardListApi();
    } catch (error) {
      return rejectWithValue(
        error.message || '데이터 불러오기 오류가 발생했습니다.',
      );
    }
  },
);

export const searchPost = createAsyncThunk(
  'board/searchPost',
  async (keyword, { rejectWithValue }) => {
    try {
      return await searchPostApi({ keyword });
    } catch (error) {
      return rejectWithValue(
        error.message || '데이터 불러오기 오류가 발생했습니다.',
      );
    }
  },
);

export const deletePost = createAsyncThunk(
  'board/deletePost',
  async ({ token, postId }, { rejectWithValue }) => {
    try {
      return await deletePostApi(token, postId);
    } catch (error) {
      return rejectWithValue(
        error.message || '게시글 삭제 중 오류가 발생했습니다.',
      );
    }
  },
);
