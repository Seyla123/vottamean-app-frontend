import { baseApi } from './baseApi';

export const subjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch data into list
    getSubjects: builder.query({
      query: () => ({
        url: 'subjects',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Subjects'],
    }),
    // Delete data a user by ID
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `subjects/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Subjects'],
    }),
    createSubject: builder.mutation({
      query: (subjectData) => ({
        url: 'subjects',
        method: 'POST',
        body: subjectData,
        credentials: 'include',
      }),
      invalidatesTags: ['Subjects'],
    }),
  }),
});

export const { useGetSubjectsQuery, useDeleteSubjectMutation, useCreateSubjectMutation } = subjectApi;
