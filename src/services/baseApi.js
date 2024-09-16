// Import createApi & fetchBaseQuery module
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    headers: (token) => ({
      Authorization: `Bearer ${token}`,
    }),
    credentials: 'include',
  }),
  tagTypes: ['Auth', 'Users', 'Admins', 'Teachers', 'Students'],
  endpoints: () => ({}),
});
