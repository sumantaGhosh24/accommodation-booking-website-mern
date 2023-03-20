import {apiSlice} from "../../app/api/apiSlice";

export const ratingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserRatings: builder.query({
      query: (user) => `/ratings/${user}`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Rating", id}],
    }),
  }),
});

export const {useGetUserRatingsQuery} = ratingApiSlice;
