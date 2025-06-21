import { createSlice } from '@reduxjs/toolkit';
import { tokenValidate } from './authThunk.js';

const initialState = {
  id: null,
  token: null,
  role: null,
  region: null,
  email: null,
  isAuthorized: false,
  isVerified: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.region = action.payload.region;
      state.email = action.payload.email;
    },
    clearAuth: (state) => {
      state.id = null;
      state.token = null;
      state.role = null;
      state.region = null;
      state.email = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(tokenValidate.pending, (state) => {
        state.isVerified = true;
        state.isAuthorized = false;
      })
      .addCase(tokenValidate.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.role = action.payload.role;
        state.isVerified = false;
        state.isAuthorized = true;
      })
      .addCase(tokenValidate.rejected, (state) => {
        state.isVerified = false;
        state.isAuthorized = false;
      });
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
