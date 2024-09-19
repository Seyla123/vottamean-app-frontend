import { baseApi } from './baseApi';

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => 'students', 
      providesTags: ['Students'],
    }),
  }),
});

export const {
  useGetStudentsQuery
} = studentApi;
;



   // // Post
    // students: builder.mutation({
    //   query: (student) => ({
    //     url: 'students',
    //     method: 'POST',
    //   }),
    //   providesTags: ['Students'],
    // }),



          // Get student by ID
    //   students: builder.query({
    //     query: (id) => ({
    //       url: `students/${id}`,
    //       method: 'GET',
    //     }),
    //     providesTags: ['Students'],
    //   }),

       // update student
    //    students: builder.mutation({
    //     query: (student) => ({
    //       url: 'students/:id',
    //       method: 'PATCH',
    //     }),
    //     providesTags: ['Students'],
    //   }),
      //delete student
    //   students: builder.mutation({
    //     query: () => ({
    //       url: 'students/:id',
    //       method: 'DELETE',
    //     }),
    //     providesTags: ['Students'],
    //   }),
  