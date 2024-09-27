import { baseApi } from './baseApi';

// Define your custom endpoints here
export const statusApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch data into list
        getStatus: builder.query({
            query: () => ({
                url: 'status',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Status'],
        }),
    }),
});

// Export the hooks for the custom endpoints
export const { useGetStatusQuery } = statusApi;