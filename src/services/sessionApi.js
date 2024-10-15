import { baseApi } from './baseApi';

// Define your custom endpoints here
export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Update session
    updateSession: builder.mutation({
      query: ({ id, sessionData }) => ({
        url: `sessions/${id}`,
        method: 'PATCH',
        body: sessionData,
        credentials: 'include',
      }),
      invalidatesTags: ['Sessions'],
    }),

    // Create session
    createSession: builder.mutation({
      query: (data) => ({
        url: 'sessions',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Sessions'],
    }),

    // Delete session
    deleteSession: builder.mutation({
      query: (id) => ({
        url: `sessions/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Sessions'],
    }),

    // Get session by id
    getSessionById: builder.query({
      query: (id) => ({
        url: `sessions/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Sessions'],
    }),
    // Get all sessions
    getSessions: builder.query({
      query: (params) => ({
        url: 'sessions',
        method: 'GET',
        credentials: 'include',
        params: params,
      }),
      providesTags: ['Sessions'],
    }),

    // Delete many sessions
    deleteManySessions: builder.mutation({
      query: (ids) => ({
        url: 'sessions',
        method: 'DELETE',
        body: { ids },
        credentials: 'include',
      }),
      invalidatesTags: ['Sessions'],
    }),
  }),
});

// Export the hooks for the custom endpoints
export const {
  useGetSessionsQuery,
  useDeleteSessionMutation,
  useGetSessionByIdQuery,
  useCreateSessionMutation,
  useUpdateSessionMutation,
  useDeleteManySessionsMutation,
} = sessionApi;
