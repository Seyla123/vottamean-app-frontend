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
  }),
});

export const {
  useGetClassesDataQuery,
  useGetClassesByIdQuery,
} = classApi;


