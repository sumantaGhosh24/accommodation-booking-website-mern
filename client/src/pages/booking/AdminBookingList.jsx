import {Col, Container, Row, Table} from "react-bootstrap";

import {useTitle} from "../../hooks";
import {useGetBookingsQuery} from "../../app/features/booking/bookingApiSlice";
import {Booking, Loading} from "../../components";

const AdminBookingList = () => {
  useTitle("Manage Booking");

  const {
    data: booking,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBookingsQuery("bookingList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

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
        <Booking key={bookingId} bookingId={bookingId} />
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

export default AdminBookingList;
