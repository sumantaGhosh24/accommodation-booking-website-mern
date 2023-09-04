import {Badge} from "react-bootstrap";
import {Link} from "react-router-dom";
import propTypes from "prop-types";

import {useGetUserBookingQuery} from "../../app/features/booking/bookingApiSlice";

const ManageMyBooking = ({bookingId}) => {
  const {booking} = useGetUserBookingQuery("bookingList", {
    selectFromResult: ({data}) => ({booking: data?.entities[bookingId]}),
  });

  if (booking) {
    return (
      <tr>
        <td>{booking.id}</td>
        <td>
          {booking?.user?.email} || {booking?.user?.mobileNumber} ||{" "}
          {booking?.user?.username} || {booking?.user?.image}
        </td>
        <td>
          {booking?.hotel?.title}{" "}
          <Link to={`/hotel/${booking?.hotel?._id}`}>show hotel</Link>
        </td>
        <td>{booking.price}</td>
        <td>
          {booking.isPaid ? (
            <Badge bg="success">Paid</Badge>
          ) : (
            <Badge bg="danger">Not Paid</Badge>
          )}
        </td>
        <td>{booking?.paymentResult?.status}</td>
        <td>{booking.startDate}</td>
        <td>{booking.endDate}</td>
        <td>{booking.status}</td>
        <td>{booking.createdAt}</td>
        <td>{booking.updatedAt}</td>
      </tr>
    );
  } else return null;
};

ManageMyBooking.propTypes = {
  bookingId: propTypes.string,
};

export default ManageMyBooking;
