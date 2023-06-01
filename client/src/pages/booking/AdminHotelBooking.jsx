import {Col, Container, Row, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";

import {useTitle} from "../../hooks";
import {useGetHotelBookingQuery} from "../../app/features/booking/bookingApiSlice";
import {Loading, ManageBooking} from "../../components";

const AdminHotelBooking = () => {
  useTitle("Hotel Booking");

  const {hotel} = useParams();

  const {
    data: booking,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHotelBookingQuery(hotel);

  if (isLoading) {
    return <Loading />;
  }

  let content;

  if (isError) {
    content = (
      <h3 className="text-center text-danger text-capitalize fw-bold mb-3">
        {error.message}
      </h3>
    );
  }

  if (isSuccess) {
    const {ids} = booking;
    const tableContent =
      ids?.length &&
      ids.map((bookingId, i) => (
        <ManageBooking key={bookingId} id={hotel} bookingId={bookingId} />
      ));

    content = (
      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>User</th>
                <th>Hotel</th>
                <th>Price</th>
                <th>Is Paid</th>
                <th>Payment Result</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </Table>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col>
            <Container className="my-5">
              <h2 className="mb-4 fw-bold">All Bookings</h2>
              {content}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminHotelBooking;
