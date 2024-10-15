import { baseApi } from './baseApi';

export const subjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all subjects
    getSubjects: builder.query({
      query: (params) => ({
        url: 'subjects',
        method: 'GET',
        params: params,
        credentials: 'include',
      }),
      providesTags: ['Subjects'],
    }),

    // Get one subject
    getSubjectById: builder.query({
      query: (id) => ({
        url: `subjects/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Subjects'],
    }),

    // Delete one subject by ID
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `subjects/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Subjects'],
    }),

    // Create subject
    createSubject: builder.mutation({
      query: (subjectData) => ({
        url: 'subjects',
        method: 'POST',
        body: subjectData,
        credentials: 'include',
      }),
      invalidatesTags: ['Subjects'],
    }),

    // Update a subject by ID
    updateSubject: builder.mutation({
      query: ({ id, formData }) => ({
        url: `subjects/${id}`,
        method: 'PUT',
        body: formData,
        credentials: 'include',
      }),
      invalidatesTags: ['Subjects'],
    }),

   // Delete many subjects
   deleteManySubjects: builder.mutation({
    query: (ids) => ({
      url: 'subjects',
      method: 'DELETE',
      body: { ids },
      credentials: 'include',
    }),
    invalidatesTags: ['Subjects'],
   }),
  }),
});

export const {
  useGetSubjectsQuery,
  useGetSubjectByIdQuery,
  useDeleteSubjectMutation,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteManySubjectsMutation,
} = subjectApi;
