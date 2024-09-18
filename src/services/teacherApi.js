import { baseApi } from './baseApi';

export const teacherApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signUpTeacher : builder.mutation({
            query: (teacher) => ({
                url: 'teachers/',
                method: 'POST',
                body: teacher
            }), 
            providesTags: ['Teachers']
        }),
        getAllTeachers : builder.mutation({
            query: () => ({
                url: 'teachers/',
                method: 'GET'
            }),
            providesTags: ['Teachers']
        })
    })
})


export const {useSignUpTeacherMutation, useGetAllTeachersMutation} = teacherApi;