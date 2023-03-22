import {apiSlice} from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/user/${id}`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "User", id}],
    }),
    getAllUser: builder.query({
      query: () => "/users",
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "User", id: "LIST"}],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/user/${data.id}`,
        method: "PUT",
        body: {data},
      }),
      invalidatesTags: (result, error, id) => [{type: "User", id}],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{type: "User", id}],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
