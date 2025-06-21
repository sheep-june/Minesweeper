import { createAsyncThunk } from '@reduxjs/toolkit';
import { tokenValidateApi } from '../../api/auth/authApi.js';

export const tokenValidate = createAsyncThunk(
  'auth/tokenValidate',
  async (token, { rejectWithValue }) => {
    try {
      return await tokenValidateApi(token);
    } catch (error) {
      return rejectWithValue(error.message || '토큰 검증에 실패했습니다.');
    }
  },
);
