import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const hotelAdapter = createEntityAdapter();

const initialState = hotelAdapter.getInitialState();

export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaginationHotels: builder.query({
      query: ({page, sort, category, search}) =>
        `/p-hotels?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`,
      transformResponse: (responseData) => {
        const loadedHotel = responseData.map((hotel) => {
          hotel.id = hotel._id;
          return hotel;
        });
        return hotelAdapter.setAll(initialState, loadedHotel);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {type: "Hotel", id: "LIST"},
            ...result.ids.map((id) => ({type: "Hotel", id})),
          ];
        } else return [{type: "Hotel", id: "LIST"}];
      },
    }),
    getHotels: builder.query({
      query: () => `/hotels`,
      transformResponse: (responseData) => {
        const loadedHotel = responseData.map((hotel) => {
          hotel.id = hotel._id;
          return hotel;
        });
        return hotelAdapter.setAll(initialState, loadedHotel);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {type: "Hotel", id: "LIST"},
            ...result.ids.map((id) => ({type: "Hotel", id})),
          ];
        } else return [{type: "Hotel", id: "LIST"}];
      },
    }),
    createHotel: builder.mutation({
      query: (credentials) => ({
        url: "/hotel",
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: [{type: "Hotel", id: "LIST"}],
    }),
    updateHotel: builder.mutation({
      query: (initialHotel) => ({
        url: "/hotel",
        method: "PUT",
        body: {
          ...initialHotel,
        },
      }),
      invalidatesTags: (result, error, arg) => [{type: "Hotel", id: arg.id}],
    }),
    deleteHotel: builder.mutation({
      query: ({id}) => ({
        url: `/hotel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{type: "Hotel", id: arg.id}],
    }),
  }),
});

export const {
  useCreateHotelMutation,
  useDeleteHotelMutation,
  useGetHotelsQuery,
  useUpdateHotelMutation,
  useGetPaginationHotelsQuery,
} = hotelApiSlice;
