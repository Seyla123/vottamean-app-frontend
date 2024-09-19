import { baseApi } from './baseApi';

export const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query({
      query: () => 'classes', 
    }),
  }),
});

export const {
  useGetClassesQuery
} = classApi;


