import {apiSlice} from "../../app/api/apiSlice";

export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => `/hotels?limit=20`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Hotel", id}],
    }),
    getHotelsSearch: builder.query({
      query: (args) => {
        const {search, sort, limit} = args;
        return {
          url: `/hotels?search=${search}&sort=${sort}&limit=${limit}`,
        };
      },
    }),
  }),
});

export const {useGetHotelsQuery, useGetHotelsSearchQuery} = hotelApiSlice;
