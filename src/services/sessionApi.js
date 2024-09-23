import { baseApi } from './baseApi';

// Define your custom endpoints here
export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create session 
    createSession : builder.mutation({
        query: (data) => ({
            url: 'sessions',
            method: 'POST',
            body: data,
            credentials: 'include',
        }),
        invalidatesTags: ['Sessions'],
    }),

    // delete session
    deleteSession: builder.mutation({
      query: (id) => ({
        url: `sessions/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Sessions'],
    }),

    // get session by id 
    getSessionById : builder.query({
      query: (id) => ({
        url: `sessions/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Sessions'], 
    }),
    // Fetch data into list
    getSessions: builder.query({
      query: () => ({
        url: 'sessions',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Sessions'],
    }),
  }),
});

// Export the hooks for the custom endpoints
export const { useGetSessionsQuery, useDeleteSessionMutation, useGetSessionByIdQuery, useCreateSessionMutation } = sessionApi;
