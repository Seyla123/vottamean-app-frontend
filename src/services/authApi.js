// Import base api configuration
import { baseApi } from './baseApi';

// Authentication API
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: '/users/signup', // Backend Route
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: '/users/login', // Backend Route
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
