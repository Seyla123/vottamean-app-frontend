import { baseApi } from './baseApi';

export const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch classes data
    getClassesData: builder.query({
      query: () => ({
        url: 'classes',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Classes'],
    }),
    //GEt class by id
    getClassesById: builder.query({
      query: (id) => ({
        url: `classes/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Classes'],
    }),
    //Post Class
    postClassesData: builder.mutation({
      query: (data) => ({
        url: `classes`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Classes'],
    }),
    //Update Class
    updateClassesData: builder.mutation({
      query: ({ id, formData }) => ({
        url: `classes/${id}`,
        method: 'PUT',
        body: formData,
        credentials: 'include',
      }),
      invalidatesTags: ['Classes'],
    }),
    //Delete Class
    deleteClassesData: builder.mutation({
      query: (id) => ({
        url: `classes/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Classes'],
    }),
    deleteManyClasses: builder.mutation({
      query: (ids) => ({
        url: `classes`,
        method: 'DELETE',
        body: {ids: ids},
        credentials: 'include',
      }),
      invalidatesTags: ['Classes'],
    })
  }),
});
export const {
  useGetClassesDataQuery,
  useGetClassesByIdQuery,
  usePostClassesDataMutation,
  useUpdateClassesDataMutation,
  useDeleteClassesDataMutation,
  useDeleteManyClassesMutation
} = classApi;
