import { baseApi } from './baseApi';

// Define your custom endpoints here
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get a usera admin by ID
    getUserProfile: builder.query({
      query: () => ({
        url: `users/me`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Users'],
    }),

    // Update user info (including photo)
    updateUserProfile: builder.mutation({
      query: (formData) => ({
        url: `users/update-me`,
        method: 'PATCH',
        body: formData,
        credentials: 'include',
      }),
      invalidatesTags: ['Users'],
    }),

    // Delete a user by ID
    deleteUserAccount: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

// Export the hooks for the custom endpoints
export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useDeleteUserAccountMutation,
} = userApi;
