// src/store/signUpSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {checkIdApi, signUpApi} from "../../api/signUp/signUpApi.js"; // API 함수 임포트

// 비동기 액션: 아이디 중복 검증
export const checkId = createAsyncThunk(
    'signUp/checkId',
    async (id, { rejectWithValue }) => {
      try {
        const data = await checkIdApi(id);
        return data.exists; // 서버 응답에서 'exists' 필드 반환
      } catch (error) {
        return rejectWithValue(error.message || '아이디 검증 중 오류가 발생했습니다.');
      }
    }
);

// 비동기 액션: 회원가입
export const signUp = createAsyncThunk(
    'signUp/signUp',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await signUpApi(formData);
        if (response.ok) {
          const data = response;
          return data; // 성공 시 서버 응답 데이터 반환
        } else {
          const errorData = await response.json();
          return rejectWithValue(errorData.message || '회원가입에 실패했습니다.');
        }
      } catch (error) {
        return rejectWithValue(error.message || '회원가입 요청 중 오류가 발생했습니다.');
      }
    }
);
