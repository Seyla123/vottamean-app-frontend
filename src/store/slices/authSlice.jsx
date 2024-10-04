import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    // This action is used to reset the authentication state
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    // Handle login success (uses credentials stored in cookies)
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.user = payload.data; // Assume the backend sends back user data
      },
    );

    // Handle logout
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
    });

    // Check if the user is already authenticated
    builder.addMatcher(
      authApi.endpoints.checkAuth.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.user = payload.data;
      },
    );

    // Handle failed authentication check
    builder.addMatcher(authApi.endpoints.checkAuth.matchRejected, (state) => {
      state.isAuthenticated = false;
      state.user = null;
    });

    // Handle profile update
    builder.addMatcher(
      authApi.endpoints.updateProfile.matchFulfilled,
      (state, { payload }) => {
        if (payload.status === 'success' && payload.data) {
          state.user = payload.data;
        }
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
