// 로그인 Thunk 정의
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuth } from '../auth/authSlice.js';
import {
  adminLoginApi,
  deleteMemberApi,
  fetchManualAuthListApi,
  fetchTotalMemberListApi,
  updateManualAuthApi,
} from '../../api/admin/adminApi.js';

export const adminLogin = createAsyncThunk(
  'admin/login',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const data = await adminLoginApi(formData);

      if (data.role !== 'DEVELOPER' && data.role !== 'ADMIN') {
        throw new Error('관리자가 아닙니다.');
      }

      // setAuth 액션 디스패치
      dispatch(
        setAuth({
          id: data.id,
          token: data.token,
          role: data.role,
          email: data.email,
        }),
      );

      return data; // 성공 시 서버 응답 데이터 반환
    } catch (error) {
      console.error('Login failed:', error);
      return rejectWithValue(
        error.message || '로그인 요청 중 오류가 발생했습니다.',
      );
    }
  },
);

export const fetchManualAuthList = createAsyncThunk(
  'admin/fetchManualAuthList',
  async (token, { rejectWithValue }) => {
    try {
      return await fetchManualAuthListApi(token);
    } catch (error) {
      return rejectWithValue(
        error.message || '데이터 불러오기 오류가 발생했습니다.',
      );
    }
  },
);

export const updateManualAuth = createAsyncThunk(
  'admin/updateManualAuth',
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await updateManualAuthApi(token, data);
    } catch (error) {
      return rejectWithValue(
        error.message || '수동인증 중 오류가 발생했습니다.',
      );
    }
  },
);

export const deleteMember = createAsyncThunk(
  'admin/deleteMember',
  async ({ token, memberId }, { rejectWithValue }) => {
    try {
      return await deleteMemberApi(token, memberId);
    } catch (error) {
      return rejectWithValue(error.message || '삭제 중 오류가 발생했습니다.');
    }
  },
);

export const fetchTotalMemberList = createAsyncThunk(
  'admin/fetchTotalMemberList',
  async (token, { rejectWithValue }) => {
    try {
      return await fetchTotalMemberListApi(token);
    } catch (error) {
      return rejectWithValue(
        error.message || '전체 유저 데이터를 불러오는 중 오류가 발생했습니다.',
      );
    }
  },
);
