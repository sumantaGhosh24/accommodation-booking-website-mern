import React from "react";
import {Badge, Col, Container, Row, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

import useTitle from "../../hooks/useTitle";
import {useGetHotelBookingsQuery} from "./bookingApiSlice";

const AdminHotelBooking = () => {
  useTitle("Hotel Bookings");

  const {hotel} = useParams();

  const {data: bookings, isLoading} = useGetHotelBookingsQuery(hotel);

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col>
            {isLoading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                }}
              >
                <CircleLoader color="#0D6EFD" size={480} />
              </div>
            )}
            {bookings?.length === 0 ? (
              <h2 className="text-center fw-bold mt-5">
                you have not any bookings yet.
              </h2>
            ) : (
              <Container className="my-5">
                <h2 className="mb-4 fw-bold">All Bookings</h2>
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
                      <tbody>
                        {bookings?.map((booking) => (
                          <tr key={booking._id}>
                            <td>{booking._id}</td>
                            <td>
                              {booking?.user?.email} ||{" "}
                              {booking?.user?.mobileNumber} ||{" "}
                              {booking?.user?.username} ||{" "}
                              {booking?.user?.image}
                            </td>
                            <td>{booking?.hotel?.title}</td>
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
                                to={`/admin-booking/${booking._id}`}
                                className="btn btn-primary btn-lg"
                              >
                                Manage Booking
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Container>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminHotelBooking;
