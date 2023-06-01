import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const bookingAdapter = createEntityAdapter();

const initialState = bookingAdapter.getInitialState();

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => `/bookings`,
      transformResponse: (responseData) => {
        const loadedBooking = responseData.map((booking) => {
          booking.id = booking._id;
          return booking;
        });
        return bookingAdapter.setAll(initialState, loadedBooking);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {type: "Booking", id: "LIST"},
            ...result.ids.map((id) => ({type: "Booking", id})),
          ];
        } else return [{type: "Booking", id: "LIST"}];
      },
    }),
    getUserBooking: builder.query({
      query: () => "/booking",
      transformResponse: (responseData) => {
        const loadedBooking = responseData.map((booking) => {
          booking.id = booking._id;
          return booking;
        });
        return bookingAdapter.setAll(initialState, loadedBooking);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {type: "Booking", id: "LIST"},
            ...result.ids.map((id) => ({type: "Booking", id})),
          ];
        } else return [{type: "Booking", id: "LIST"}];
      },
    }),
    getHotelBooking: builder.query({
      query: (hotel) => `/hotel-booking/${hotel}`,
      transformResponse: (responseData) => {
        const loadedBooking = responseData.map((booking) => {
          booking.id = booking._id;
          return booking;
        });
        return bookingAdapter.setAll(initialState, loadedBooking);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {type: "Booking", id: "LIST"},
            ...result.ids.map((id) => ({type: "Booking", id})),
          ];
        } else return [{type: "Booing", id: "LIST"}];
      },
    }),
    updateBooking: builder.mutation({
      query: (initialBooking) => ({
        url: "/booking",
        method: "PUT",
        body: {
          ...initialBooking,
        },
      }),
      invalidatesTags: (result, error, arg) => [{type: "Booking", id: arg.id}],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetHotelBookingQuery,
  useGetUserBookingQuery,
  useUpdateBookingMutation,
} = bookingApiSlice;
