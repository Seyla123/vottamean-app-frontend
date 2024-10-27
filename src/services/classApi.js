import { baseApi } from './baseApi';

export const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all classes
    getClassesData: builder.query({
      query: (params) => ({
        url: 'classes',
        method: 'GET',
        params: params,
        credentials: 'include',
      }),
      providesTags: ['Classes'],
    }),
    
    // Get class by ID
    getClassesById: builder.query({
      query: (id) => ({
        url: `classes/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Classes'],
    }),

    // Create a new class
    postClassesData: builder.mutation({
      query: (data) => ({
        url: `classes`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Classes'],
    }),

    // Update an existing class
    updateClassesData: builder.mutation({
      query: ({ id, formData }) => ({
        url: `classes/${id}`,
        method: 'PUT',
        body: formData,
        credentials: 'include',
      }),
      invalidatesTags: ['Classes'],
    }),

    // Delete a class by ID
    deleteClassesData: builder.mutation({
      query: (id) => ({
        url: `classes/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Classes'],
    }),

    // Delete multiple classes
    deleteManyClasses: builder.mutation({
      query: (ids) => ({
        url: `classes`,
        method: 'DELETE',
        body: { ids },
        credentials: 'include',
      }),
      invalidatesTags: ['Classes'],
    }),

    // student class filter
    studentClassFilter: builder.query({
      query: () => ({
        url: `classes/student-class-filter`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Classes'],
    })
  }),
});
export const {
  useGetClassesDataQuery,
  useGetClassesByIdQuery,
  usePostClassesDataMutation,
  useUpdateClassesDataMutation,
  useDeleteClassesDataMutation,
  useDeleteManyClassesMutation,
  useStudentClassFilterQuery,
} = classApi;
