import {apiSlice} from "../../app/api/apiSlice";

export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => `/hotels?limit=10`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Hotel", id}],
    }),
    getAllHotels: builder.query({
      query: () => `/all-hotels`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Hotel", id: "LIST"}],
    }),
    getHotelsSearch: builder.query({
      query: (args) => {
        const {search, sort, limit} = args;
        return {
          url: `/hotels?search=${search}&sort=${sort}&limit=${limit}`,
        };
      },
    }),
    getHotel: builder.query({
      query: (id) => `/hotel/${id}`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{type: "Hotel", id}],
    }),
    createHotel: builder.mutation({
      query: (credentials) => ({
        url: "/hotel",
        method: "POST",
        body: {...credentials},
      }),
    }),
    updateHotel: builder.mutation({
      query: (data) => ({
        url: `/hotel/${data.id}`,
        method: "PUT",
        body: {data},
      }),
      invalidatesTags: (result, error, id) => [{type: "Hotel", id}],
    }),
    deleteHotel: builder.mutation({
      query: (id) => ({
        url: `/hotel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{type: "Hotel", id}],
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelsSearchQuery,
  useGetHotelQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
  useGetAllHotelsQuery,
} = hotelApiSlice;
