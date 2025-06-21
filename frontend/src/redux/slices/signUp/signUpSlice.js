// src/store/signUpSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { checkId, signUp } from './SignUpThunk.js';

const initialState = {
  formData: {
    id: '',
    password: '',
    passwordConfirmation: '',
    email: '',
    addressAuth: 0,
  },
  formErrors: {
    id: '',
    password: '',
    passwordConfirmation: '',
    email: '',
    idCardImage: '',
    addressAuth: '',
  },
  isCheckingId: false,
  checkIdError: '',
  isSigningUp: false,
  signUpSuccess: false,
  signUpError: '',
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
      state.formErrors[field] = ''; // 필드 수정 시 에러 초기화
    },
    setFormErrors: (state, action) => {
      state.formErrors = action.payload;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.formErrors = initialState.formErrors;
      state.checkIdError = '';
      state.isSigningUp = false;
      state.signUpSuccess = false;
      state.signUpError = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // 아이디 중복 검증
      .addCase(checkId.pending, (state) => {
        state.isCheckingId = true;
        state.formErrors.id = ''; // 에러 초기화
        state.checkIdError = '';
      })
      .addCase(checkId.fulfilled, (state, action) => {
        state.isCheckingId = false;
        if (action.payload) {
          // 아이디가 중복된 경우
          state.formErrors.id = '아이디가 중복됩니다.';
        } else {
          // 아이디가 사용 가능한 경우
          state.formErrors.id = '';
        }
      })
      .addCase(checkId.rejected, (state, action) => {
        state.isCheckingId = false;
        state.checkIdError =
          action.payload || '아이디 중복 검증 중 오류가 발생했습니다.';
      })

      // 회원가입
      .addCase(signUp.pending, (state) => {
        state.isSigningUp = true;
        state.signUpError = '';
        state.signUpSuccess = false;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isSigningUp = false;
        state.signUpSuccess = true;
        // 필요 시 추가적인 상태 업데이트
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isSigningUp = false;
        state.signUpError =
          action.payload || '회원가입 중 오류가 발생했습니다.';
      });
  },
});

export const { updateFormField, setFormErrors, resetForm } =
  signUpSlice.actions;

export default signUpSlice.reducer;
