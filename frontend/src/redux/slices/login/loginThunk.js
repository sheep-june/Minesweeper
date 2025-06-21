import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../../api/login/loginApi.js';
import { setAuth } from '../auth/authSlice.js';

// 로그인 Thunk 정의
export const login = createAsyncThunk(
  'login/login',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const data = await loginApi(formData);

      // setAuth 액션 디스패치
      dispatch(
        setAuth({
          id: data.id,
          token: data.token,
          region: data.region,
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
