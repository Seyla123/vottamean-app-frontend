import { baseApi } from './baseApi';

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all students' data
    getAllStudents: builder.query({
      query: () => ({
        url: 'students',
        method: 'GET',
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

    // Delete multiple students by marking them as inactive
    deleteManyStudents: builder.mutation({
      query: (ids) => ({
        url: 'students/delete-many',
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
