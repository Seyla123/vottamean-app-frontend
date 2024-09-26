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

    // Get subject by Id
    getSubjectById: builder.query({
      query: (id) => ({
        url: `subjects/${id}`,
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
      query: ({ id, formData }) => ({
        url: `subjects/${id}`,
        method: 'PUT',
        body: formData,
        credentials: 'include',
      }),
      providesTags: ['Subjects'],
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useGetSubjectByIdQuery,
  useDeleteSubjectMutation,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
} = subjectApi;
