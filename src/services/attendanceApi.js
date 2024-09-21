import { baseApi } from './baseApi';

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAttendance: builder.query({
      query: (data) => ({
        url: `attendance`,
        method: 'GET',
        params: {
          classId: data.classId,
          subjectId: data.subjectId,
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
  }),
});

export const { useGetAllAttendanceQuery, useDeleteAttendanceMutation, useGetAttendanceQuery } = attendanceApi;
