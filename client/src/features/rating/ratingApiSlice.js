import {apiSlice} from "../../app/api/apiSlice";

export const ratingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRatings: builder.query({
      query: () => "/ratings",
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Rating", id: "LIST"}],
    }),
    getUserRatings: builder.query({
      query: (user) => `/ratings/${user}`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Rating", id}],
    }),
    getSingleRating: builder.query({
      query: (id) => `/rating/${id}`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Rating", id}],
    }),
    updateRating: builder.mutation({
      query: (data) => ({
        url: `/rating/${data.id}`,
        method: "PUT",
        body: {
          data,
        },
      }),
      invalidatesTags: (result, error, id) => [{type: "Rating", id}],
    }),
    deleteRating: builder.mutation({
      query: (id) => ({
        url: `/rating/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{type: "Rating", id}],
    }),
    createRating: builder.mutation({
      query: (credentials) => ({
        url: `/hrating/${credentials.id}`,
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: (result, error, id) => [{type: "Rating", id: "LIST"}],
    }),
  }),
});

export const {
  useGetUserRatingsQuery,
  useGetSingleRatingQuery,
  useUpdateRatingMutation,
  useDeleteRatingMutation,
  useGetAllRatingsQuery,
  useCreateRatingMutation,
} = ratingApiSlice;
