import {apiSlice} from "../../app/api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => "/category",
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Category", id: "LIST"}],
    }),
    createCategory: builder.mutation({
      query: (credentials) => ({
        url: "/category",
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: (result, error, id) => [{type: "Category", id: "LIST"}],
    }),
    getSingleCategory: builder.query({
      query: (id) => `/category/${id}`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Category", id}],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `/category/${data.id}`,
        method: "PUT",
        body: {
          data,
        },
      }),
      invalidatesTags: (result, error, id) => [{type: "Category", id}],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{type: "Category", id}],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
