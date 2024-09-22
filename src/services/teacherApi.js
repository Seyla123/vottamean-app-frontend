import { baseApi } from './baseApi';

export const teacherApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signUpTeacher: builder.mutation({
            query: (teacher) => ({
                url: 'teachers',
                method: 'POST',
                body: teacher
            }),
            providesTags: ['Teachers']
        }),
        getAllTeachers: builder.query({
            query: (params) => ({
              url: 'teachers',
              params: params,
            }),
            providesTags: ['Teachers'],
          }),
        deleteTeacher: builder.mutation({
            query: (id) => ({
                url: `teachers/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Teachers'],
        })
    })
})

export const {
    useSignUpTeacherMutation,
    useGetAllTeachersQuery, 
    useDeleteTeacherMutation,
} = teacherApi;
