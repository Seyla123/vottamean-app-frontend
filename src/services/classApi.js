import { baseApi } from './baseApi';

export const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassesData: builder.query({
      query: ({limit = 5, page= 1}) => ({
        url: 'classes',
        params: {
            limit,
            page
        },
        method: 'GET',
        credentials: 'include',
      }), 
      providesTags: ['Classes'],
    }),
  }),
});

export const {
  useGetClassesDataQuery
} = classApi;


