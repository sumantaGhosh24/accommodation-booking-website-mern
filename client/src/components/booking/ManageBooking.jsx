import {Badge} from "react-bootstrap";
import {Link} from "react-router-dom";
import propTypes from "prop-types";

import {useGetHotelBookingQuery} from "../../app/features/booking/bookingApiSlice";

const ManageBooking = ({bookingId, id}) => {
  const {booking} = useGetHotelBookingQuery(`${id}`, {
    selectFromResult: ({data}) => ({booking: data?.entities[bookingId]}),
  });

  console.log(bookingId, id);

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
          <Link to={`/admin-booking/hotel/${booking?.hotel?._id}`}>
            show hotel booking
          </Link>
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
        <td>
          <Link
            to={`/admin-booking/${booking.id}`}
            className="btn btn-primary btn-lg"
          >
            Manage Booking
          </Link>
        </td>
      </tr>
    );
  } else return null;
};

ManageBooking.propTypes = {
  bookingId: propTypes.string,
  id: propTypes.number,
};

export default ManageBooking;
