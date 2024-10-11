import { baseApi } from './baseApi';

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAttendance: builder.query({
      query: (data) => ({
        url: `attendance`,
        method: 'GET',
        params: {
          class_id: data.class,
          subject_id: data.subject,
          filter: data.filter,
        },
      }),
      providesTags: ['Attendance'],
    }),
    deleteAttendance: builder.mutation({
      query: (data) => ({
        url: `attendance/${data.id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Attendance'],
    }),
    getAttendance: builder.query({
      query: (data) => ({
        url: `attendance/${data.id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Attendance'],
    }),
    markAttendance: builder.mutation({
      query: (data) => ({
        url: `attendance`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Attendance'],
    }),
    getReportAttendanceByClass : builder.query({
      query: (data) => ({
        url: `attendance/reports`,
        method: 'GET',
        params: {
          class_id: data.class,
          subject_id: data.subject,
          filter: data.filter,
        },
        credentials: 'include',
      }),
      providesTags: ['Attendance'],
    })
  }),
});

export const { useGetAllAttendanceQuery, useDeleteAttendanceMutation, useGetAttendanceQuery, useMarkAttendanceMutation , useGetReportAttendanceByClassQuery} = attendanceApi;
