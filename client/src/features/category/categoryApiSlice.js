import {apiSlice} from "../../app/api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "/category",
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Category", id}],
    }),
  }),
});

export const {useGetCategoryQuery} = categoryApiSlice;
