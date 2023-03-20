import {apiSlice} from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/user/${id}`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "User", id}],
    }),
  }),
});

export const {useGetUserQuery} = usersApiSlice;
