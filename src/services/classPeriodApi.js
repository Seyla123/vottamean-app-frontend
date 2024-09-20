import { baseApi } from './baseApi';

export const classPeriodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch data into list
    viewListClassPeriod: builder.query({
      query: () => ({
        url: 'periods',
        // params:{
        //   limit:5,
        //   page:1
        // },
        method: 'GET',
        credentials: 'include',
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
      query: (classPeriod) => ({
        url: 'periods',
        method: 'POST',
        body: classPeriod,
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

//     // Update data by Id
//     updateClassPeriod: builder.mutation({
//       query: (id) => ({
//         url: `/admin/class-periods/${id}`,
//         method: 'PATCH',
//         credentails: 'include',
//       }),
//       invalidatesTags: ['ClassPeriods'],
//     }),

//     // Update data by Id
//     deleteClassPeriod: builder.mutation({
//       query: (id) => ({
//         url: `/admin/class-periods/${id}`,
//         method: 'PATCH',
//         credentails: 'include',
//       }),
//       invalidatesTags: ['ClassPeriods'],
//     }),
  }),
});

export const {
  useViewListClassPeriodQuery,
  useGetClassPeriodByIdQuery,
  useCreateClassPeriodMutation,
  useDeleteClassPeriodMutation
} = classPeriodApi;