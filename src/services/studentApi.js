import { baseApi } from './baseApi';

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch classes data
    getStudentsData: builder.query({
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
    postStudentsData: builder.mutation({
      query: (data) => ({
        url: `students`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Students'],
    }),
    //Update Class
    updateStudentsData: builder.mutation({
      query: ({id, studentData}) => ({
        url: `students/${id}`,
        method: 'PUT',
        body: studentData,
        credentials: 'include',
      }),
      invalidatesTags: ['Students'],
    }),
      //Delete Class
  deleteStudentsData: builder.mutation({
    query: (id) => ({
      url: `students/${id}`,
      method: 'DELETE',
      credentials: 'include',
    }), 
    invalidatesTags: ['Students'],
  }),
})
});
export const {
  useGetStudentsDataQuery,
  useGetStudentsByIdQuery,
  usePostStudentsDataMutation,
  useUpdateStudentsDataMutation,
  useDeleteStudentsDataMutation,
} = studentApi;
