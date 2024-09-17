import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Signup
    signup: builder.mutation({
      query: (user) => ({
        url: 'auth/signup',
        method: 'POST',
        body: user,
        credentials: 'include',
      }),
      providesTags: ['Auth'],
    }),

    // Verify user email
    verifyEmail: builder.mutation({
      query: ({ verificationToken, tempToken }) => ({
        url: `auth/verify-email/${verificationToken}?token=${tempToken}`,
        method: 'GET',
        credentials: 'include',
      }),
      invalidatesTags: ['Auth'],
    }),

    // Login
    login: builder.mutation({
      query: (user) => ({
        url: 'auth/login',
        method: 'POST',
        body: user,
        credentials: 'include',
      }),
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      providesTags: ['Auth'],
    }),

    // Forgot password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Auth'],
    }),

    // Reset password
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `auth/reset-password/${token}`,
        method: 'PATCH',
        body: {
          password: newPassword,
          passwordConfirm: newPassword,
        },
      }),
      providesTags: ['Auth'],
    }),

    // Update password
    updatePassword: builder.mutation({
      query: (data) => ({
        url: 'auth/update-password',
        method: 'PATCH',
        body: data,
        credentials: 'include',
      }),
      providesTags: ['Auth'],
    }),

    // Check the user authorization
    checkAuth: builder.query({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useCheckAuthQuery,
} = authApi;
