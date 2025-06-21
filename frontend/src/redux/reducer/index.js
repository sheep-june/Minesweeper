import { combineReducers } from '@reduxjs/toolkit';
import signUpSlice from '../slices/signUp/signUpSlice.js';
import loginSlice from '../slices/login/loginSlice.js';
import authSlice from '../slices/auth/authSlice.js';
import boardSlice from '../slices/board/boardSlice.js';
import adminSlice from '../slices/admin/adminSlice.js';

const rootReducer = combineReducers({
  login: loginSlice,
  signUp: signUpSlice,
  auth: authSlice,
  board: boardSlice,
  admin: adminSlice,
});

export default rootReducer;
