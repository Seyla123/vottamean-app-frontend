import { baseApi } from './baseApi';

export const subjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: () => ({
        url: 'subjects',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Subjects'],
    }),
  }),
});

export const { useGetSubjectsQuery } = subjectApi;
