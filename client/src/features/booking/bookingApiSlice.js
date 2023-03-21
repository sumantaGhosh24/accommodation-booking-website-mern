import {apiSlice} from "../../app/api/apiSlice";

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserBooking: builder.query({
      query: () => "/booking",
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Booking", id}],
    }),
    getSingleBooking: builder.query({
      query: (id) => `/booking/${id}`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Booking", id}],
    }),
    updateBooking: builder.mutation({
      query: (data) => ({
        url: `/booking/${data.id}`,
        method: "PUT",
        body: {
          data,
        },
      }),
      invalidatesTags: (result, error, id) => [{type: "Booking", id}],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{type: "Booking", id}],
    }),
  }),
});

export const {
  useGetUserBookingQuery,
  useGetSingleBookingQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApiSlice;
