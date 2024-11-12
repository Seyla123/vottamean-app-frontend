import { baseApi } from './baseApi';

export const teacherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUpTeacher: builder.mutation({
      query: (teacher) => ({
        url: 'teachers',
        method: 'POST',
        body: teacher,
        credentials: 'include',
      }),
      invalidatesTags: ['Teachers'],

    }),

    // Send invitation email
    sendTeacherInvitation: builder.mutation({
      query: (data) => ({
        url: `teachers/send-invitation`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Teachers'],
    }),

    // complete registration
    completeRegistration: builder.mutation({
      query: (data) => ({
        url: `teachers/complete-registration`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Teachers'],
    }),

    getAllTeachers: builder.query({
      query: (params) => ({
        url: 'teachers',
        params: params,
        credentials: 'include',
      }),
      providesTags: ['Teachers'],
    }),

    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `teachers/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Teachers'],
    }),

    updateTeacher: builder.mutation({
      query: ({ id, updates }) => ({
        url: `teachers/${id}`,
        method: 'PUT',
        body: updates,
        credentials: 'include',
      }),
      invalidatesTags: ['Teachers'],
    }),

    getTeacher: builder.query({
      query: (id) => `teachers/${id}`,
      providesTags: ['Teachers'],
      credentials: 'include',
    }),

    getTeacherScheduleClasses: builder.query({
      query: (data) => ({
        url: `teachers/sessions`,
        method: 'GET',
        params: {
          filter: data?.filter || 'all',
          active: 1
        },
      }),
      providesTags: ['Teachers', 'Attendance'],
    }),

    getAllStudentsByClassInSession: builder.query({
      query: (id) => ({
        url: `teachers/sessions/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Teachers'],
    }),

    // Delete many teachers
    deleteManyTeachers: builder.mutation({
      query: (ids) => ({
        url: `teachers`,
        method: 'DELETE',
        body: { ids },
        credentials: 'include',
      }),
      invalidatesTags: ['Teachers']
    }),

    // Deactivate teacher
    deactivateTeacher: builder.mutation({
      query: (id) => ({
        url: `teachers/deactivate/${id}`,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Teachers'],
    }),

    //Reactivate teacher
    reactivateTeacher: builder.mutation({
      query: (id) => ({
        url: `teachers/reactivate/${id}`,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Teachers'],
    }),

    //Resend verification teacher account
    resendVerificationTeacher: builder.mutation({
      query: (id) => ({
        url: `teachers/resend-verification/${id}`,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Teachers'],
    }),
  }),
});

export const {
  useSignUpTeacherMutation,
  useGetAllTeachersQuery,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
  useGetTeacherQuery,
  useGetTeacherScheduleClassesQuery,
  useGetAllStudentsByClassInSessionQuery,
  useSendTeacherInvitationMutation,
  useCompleteRegistrationMutation,
  useDeleteManyTeachersMutation,
  useDeactivateTeacherMutation,
  useReactivateTeacherMutation,
  useResendVerificationTeacherMutation,
} = teacherApi;
