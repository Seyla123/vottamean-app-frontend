import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log('Login fulfilled payload:', payload);
        state.isAuthenticated = true;
        state.user = payload.data;
      },
    );
  },
});

export default authSlice.reducer;
