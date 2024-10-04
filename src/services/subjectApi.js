import { baseApi } from './baseApi';

export const subjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL subjects
    getSubjects: builder.query({
      query: () => ({
        url: 'subjects',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Subjects'],
    }),

    // GET ONE subject
    getSubjectById: builder.query({
      query: (id) => ({
        url: `subjects/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Subjects'],
    }),

    // DELETE ONE subject by ID
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `subjects/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      providesTags: ['Subjects'],
    }),

    // CREATE subject
    createSubject: builder.mutation({
      query: (subjectData) => ({
        url: 'subjects',
        method: 'POST',
        body: subjectData,
        credentials: 'include',
      }),
      providesTags: ['Subjects'],
    }),

    // UPDATE a subject by ID
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
