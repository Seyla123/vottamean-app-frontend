import { baseApi } from './baseApi';

// Define your custom endpoints here
export const dayApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch data into list
    getDay: builder.query({
      query: () => ({
        url: 'days',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Days'],
    }),
  }),
});

// Export the hooks for the custom endpoints
export const { useGetDayQuery } = dayApi;