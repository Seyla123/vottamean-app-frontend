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
            query: () => 'teachers', 
            method: 'GET',
            providesTags: ['Teachers']
        }),
    })
})

export const {
    useSignUpTeacherMutation,
    useGetAllTeachersQuery, 
} = teacherApi;
