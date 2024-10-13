import { baseApi } from './baseApi';

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all students' data
    getAllStudents: builder.query({
      query: (data) => ({
        url: 'students',
        method: 'GET',
        params: data.class_id ? {
          class_id: data.class_id,
          search: data.search,
        } : {
          search: data.search
        },
        credentials: 'include',
      }),
      providesTags: ['Students'],
    }),

    // Fetch student data by ID
    getStudentsById: builder.query({
      query: (id) => ({
        url: `students/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Students'],
    }),

    // Create a new student
    createStudent: builder.mutation({
      query: (data) => ({
        url: 'students',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Students'],
    }),

    // Update an existing student's information
    updateStudent: builder.mutation({
      query: ({ id, updates }) => ({
        url: `students/${id}`,
        method: 'PATCH',
        body: updates,
        credentials: 'include',
      }),
      invalidatesTags: ['Students'],
    }),

    // Delete a student by ID
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `students/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Students'],
    }),

    // Delete many stundets
    deleteManyStudents: builder.mutation({
      query: (ids) => ({
        url: 'students',
        method: 'DELETE',
        body: { ids },
        credentials: 'include',
      }),
      invalidatesTags: ['Students'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllStudentsQuery,
  useGetStudentsByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useDeleteManyStudentsMutation,
} = studentApi;
