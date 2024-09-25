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
        }),
        updateTeacher: builder.mutation({
            query: ({ id, updates }) => ({
                url: `teachers/${id}`,
                method: 'PUT',
                body: updates
            }),
            invalidatesTags: ['Teachers'],
        }),
        getTeacher: builder.query({
            query: (id) => `teachers/${id}`,
            providesTags: ['Teachers'],
        }),
        getTeacherClasses: builder.query({
            query: (data) => ({
                url: `teachers/classes`,
                method: 'GET',
                params: {
                    filter: data?.filter || ''
                }
            }),
            providesTags: ['Teachers'],
        })
    })
})

export const {
    useSignUpTeacherMutation,
    useGetAllTeachersQuery, 
    useDeleteTeacherMutation,
    useUpdateTeacherMutation,
    useGetTeacherQuery,
    useGetTeacherClassesQuery
} = teacherApi;
