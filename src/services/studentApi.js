import { baseApi } from './baseApi';

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch classes data
    getAllStudents: builder.query({
      query: () => ({
        url: 'students',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Students'],
    }),

    //GEt class by id
    getStudentsById: builder.query({
      query: (id) => ({
        url: `students/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Students'],
    }),

    //Post Class
    createStudent: builder.mutation({
      query: (data) => ({
        url: `students`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Students'],
    }),
    //Update Class
    updateStudent: builder.mutation({
      query: ({ id, updates }) => ({
        url: `students/${id}`,
        method: 'PATCH',
        body: updates,
        credentials: 'include',
      }),
      invalidatesTags: ['Students'],
    }),
    //Delete Class
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `students/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Students'],
    }),
  }),
});
export const {
  useGetAllStudentsQuery,
  useGetStudentsByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
