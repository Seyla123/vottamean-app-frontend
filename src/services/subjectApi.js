import { baseApi } from './baseApi';

export const subjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get subject
    getSubjects: builder.query({
      query: () => ({
        url: 'subjects',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Subjects'],
    }),

    // Delete subject by ID
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `subjects/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      providesTags: ['Subjects'],
    }),

    // Create subject
    createSubject: builder.mutation({
      query: (subjectData) => ({
        url: 'subjects',
        method: 'POST',
        body: subjectData,
        credentials: 'include',
      }),
      providesTags: ['Subjects'],
    }),

    // Update subject
    updateSubject: builder.mutation({
      query: (subjectDetail) => ({
        url: `subjects/${subjectDetail.id}`,
        method: 'PUT',
        body: formData,
        credentials: 'include',
      }),
      providesTags: ['Subjects'],
    })
  }),
});

export const {
  useGetSubjectsQuery,
  useDeleteSubjectMutation,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
} = subjectApi;
