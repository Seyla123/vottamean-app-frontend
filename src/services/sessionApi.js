import { baseApi } from './baseApi';

// Define your custom endpoints here
export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
export const { useGetSessionsQuery } = sessionApi;