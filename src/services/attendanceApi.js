import { baseApi } from './baseApi';

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAttendance: builder.query({
      query: (data) => ({
        url: `attendance`,
        method: 'GET',
        params: data.filter == 'custom' ? {
          active:1,
          class_id: data.class,
          subject_id: data.subject,
          limit: data.limit,
          page: data.page,
          gte_date: data.startDate,
          lte_date: data.endDate,
        } : {
          active:1,
          class_id: data.class,
          subject_id: data.subject,
          filter: data.filter,
          limit: data.limit,
          page: data.page,
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

    deleteManyAttendance: builder.mutation({
      query: (ids) => ({
        url: `attendance`,
        method: 'DELETE',
        body: { ids: ids },
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
    getReportAttendanceByClass: builder.query({
      query: (data) => ({
        url: `attendance/reports`,
        method: 'GET',
        params: data.filter == 'custom' ? {
          active:1,
          class_id: data.class,
          subject_id: data.subject,
          limit:1000,
          page: data.page,
          gte_date: data.startDate,
          lte_date: data.endDate,
        } : {
          active:1,
          class_id: data.class,
          subject_id: data.subject,
          filter: data.filter,
          limit: 1000,
          page: data.page,
        },
        credentials: 'include',
      }),
      providesTags: ['Attendance'],
    }),
  }),
});

export const {
  useGetAllAttendanceQuery,
  useDeleteAttendanceMutation,
  useGetAttendanceQuery,
  useMarkAttendanceMutation,
  useGetReportAttendanceByClassQuery,
  useDeleteManyAttendanceMutation,
} = attendanceApi;
