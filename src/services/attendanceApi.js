import { baseApi } from './baseApi';

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAttendance: builder.query({
      query: (data=[]) => ({
        url: `attendance`,
        method: 'GET',
        params: {
          classId: data.classId,
          subjectId: data.subjectId,
          date: data.date,
        },
      }),
    }),
  }),
});

export const { useGetAllAttendanceQuery } = attendanceApi;
