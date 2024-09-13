// Import createApi & fetchBaseQuery module
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1',
  }),
  tagTypes: ['Auth', 'Users', 'Admins', 'Teachers', 'Students'],
  endpoints: () => ({}),
});
