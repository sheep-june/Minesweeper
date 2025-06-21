import { createSlice } from '@reduxjs/toolkit';
import {
  adminLogin,
  deleteMember,
  fetchManualAuthList,
  fetchTotalMemberList,
  updateManualAuth,
} from './adminThunk.js';

const initialState = {
  manualAuthList: [],
  totalMemberList: [],
  isLoading: false,
  error: null,
  isLoggedIn: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || '로그인에 실패했습니다.';
      })
      .addCase(fetchManualAuthList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchManualAuthList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.manualAuthList = action.payload;
      })
      .addCase(fetchManualAuthList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || '로그인에 실패했습니다.';
      })
      .addCase(updateManualAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateManualAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.manualAuthList = action.payload;
      })
      .addCase(updateManualAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || '로그인에 실패했습니다.';
      })

      .addCase(fetchTotalMemberList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotalMemberList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalMemberList = action.payload;
      })
      .addCase(fetchTotalMemberList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload.message || '유저 목록을 불러오는데 실패했습니다.';
      })
      .addCase(deleteMember.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMember.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || '유저 삭제를 실패했습니다.';
      });
  },
});

// export const {} = adminSlice.actions;

export default adminSlice.reducer;
