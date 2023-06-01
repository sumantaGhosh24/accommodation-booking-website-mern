import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const ratingAdapter = createEntityAdapter();

const initialState = ratingAdapter.getInitialState();

export const ratingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRatings: builder.query({
      query: () => `/all-ratings`,
      transformResponse: (responseData) => {
        const loadedRating = responseData.map((rating) => {
          rating.id = rating._id;
          return rating;
        });
        return ratingAdapter.setAll(initialState, loadedRating);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {type: "Rating", id: "LIST"},
            ...result.ids.map((id) => ({type: "Rating", id})),
          ];
        } else return [{type: "Rating", id: "LIST"}];
      },
    }),
    getRatings: builder.query({
      query: (id) => `/ratings/${id}`,
      transformResponse: (responseData) => {
        const loadedRating = responseData.map((rating) => {
          rating.id = rating._id;
          return rating;
        });
        return ratingAdapter.setAll(initialState, loadedRating);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {type: "Rating", id: "LIST"},
            ...result.ids.map((id) => ({type: "Rating", id})),
          ];
        } else return [{type: "Rating", id: "LIST"}];
      },
    }),
    getMyRatings: builder.query({
      query: () => "/ratings",
      transformResponse: (responseData) => {
        const loadedRating = responseData.map((rating) => {
          rating.id = rating._id;
          return rating;
        });
        return ratingAdapter.setAll(initialState, loadedRating);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {type: "Rating", id: "LIST"},
            ...result.ids.map((id) => ({type: "Rating", id})),
          ];
        } else return [{type: "Rating", id: "LIST"}];
      },
    }),
    createRating: builder.mutation({
      query: (credentials) => ({
        url: `/rating/${credentials.id}`,
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: [{type: "Rating", id: "LIST"}],
    }),
  }),
});

export const {
  useCreateRatingMutation,
  useGetAllRatingsQuery,
  useGetMyRatingsQuery,
  useGetRatingsQuery,
} = ratingApiSlice;
