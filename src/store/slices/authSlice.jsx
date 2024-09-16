// src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';

const initialState = {
  isAuthenticated: false,
  user: null, // user object with role
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.user = payload.user;
      },
    );
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
