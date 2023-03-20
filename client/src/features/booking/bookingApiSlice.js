import {apiSlice} from "../../app/api/apiSlice";

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserBooking: builder.query({
      query: () => "/booking",
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Booking", id}],
    }),
  }),
});

export const {useGetUserBookingQuery} = bookingApiSlice;
