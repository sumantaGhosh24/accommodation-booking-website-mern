import {useParams} from "react-router-dom";

import {useTitle} from "../../hooks";
import {useGetBookingsQuery} from "../../app/features/booking/bookingApiSlice";
import {EditBookingForm, Loading} from "../../components";

const AdminUpdateBooking = () => {
  useTitle("Update Booking");

  const {id} = useParams();

  const {booking} = useGetBookingsQuery("bookingList", {
    selectFromResult: ({data}) => ({
      booking: data?.entities[id],
    }),
  });

  if (!booking) return <Loading />;

  return <EditBookingForm booking={booking} />;
};

export default AdminUpdateBooking;
