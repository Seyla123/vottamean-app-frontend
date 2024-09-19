import { baseApi } from './baseApi';

export const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassesData: builder.query({
      query: () => ({
        url: 'classes',
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


