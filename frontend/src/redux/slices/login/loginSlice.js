import { createSlice } from "@reduxjs/toolkit";
import { login } from "./loginThunk.js";

const initialState = {
  formData: {
    id: "",
    password: "",
  },
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || "로그인에 실패했습니다.";
      });
  },
});

export const { updateFormData, resetForm, logout } = loginSlice.actions;

export default loginSlice.reducer;
