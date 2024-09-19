import { baseApi } from './baseApi';

// Define your custom endpoints here
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get a usera admin by ID
    getUserProfileById: builder.query({
      query: () => ({
        url: `users/me`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Admins'],
    }),

    // Update user info (including photo)
    updateUserProfileById: builder.mutation({
      query: (formData) => ({
        url: `users/update-me`,
        method: 'PATCH',
        body: formData,
        credentials: 'include',
      }),
      invalidatesTags: ['Users'],
    }),

    // Delete a user by ID
    deleteUserById: builder.mutation({
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
  useGetUserProfileByIdQuery,
  useUpdateUserProfileByIdMutation,
  useDeleteUserByIdMutation,
} = userApi;
