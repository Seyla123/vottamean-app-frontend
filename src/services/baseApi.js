import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'Auth',
    'Users',
    'Admins',
    'Teachers',
    'Students',
    'ClassPeriods',
    'Attendance',
    'Sessions',
    'Days',
    'Subjects',
  ],
  endpoints: () => ({}),
});
