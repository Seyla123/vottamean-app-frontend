import { baseApi } from './baseApi';

export const classPeriodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch data into list
    getClassPeriod: builder.query({
      query: (params) => ({
        url: 'periods',
        method: 'GET',
        credentials: 'include',
        params: params,
      }),
      providesTags: ['ClassPeriods'],
    }),

    // Fetch detail data
    getClassPeriodById: builder.query({
      query: (id) => ({
        url: `periods/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['ClassPeriods'],
    }),

    // Create data
    createClassPeriod: builder.mutation({
      query: (classPeriodData) => ({
        url: 'periods',
        method: 'POST',
        body: classPeriodData,
        credentials: 'include',
      }),
      invalidatesTags: ['ClassPeriods'],
    }),

    // Delete data a user by ID
    deleteClassPeriod: builder.mutation({
      query: (id) => ({
        url: `periods/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['ClassPeriods'],
    }),

    // Update data
    updateClassPeriod: builder.mutation({
      query: (classPeriodData) => ({
        url: `periods/${classPeriodData.id}`,
        method: 'PATCH',
        body: classPeriodData,
        credentials: 'include',
      }),
      invalidatesTags: ['ClassPeriods'],
    }),

    // Delete many class periods
    deleteManyClassPeriods: builder.mutation({
      query: (ids) => ({
        url: 'periods',
        method: 'DELETE',
        body: { ids },
        credentials: 'include',
      }),
      invalidatesTags: ['ClassPeriods'],
    }),
  }),
});

export const {
  useGetClassPeriodQuery,
  useGetClassPeriodByIdQuery,
  useCreateClassPeriodMutation,
  useDeleteClassPeriodMutation,
  useUpdateClassPeriodMutation,
  useDeleteManyClassPeriodsMutation,
} = classPeriodApi;
