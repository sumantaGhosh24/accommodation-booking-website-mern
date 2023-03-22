import jwtDecode from "jwt-decode";
import React from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import CircleLoader from "react-spinners/CircleLoader";

import useTitle from "../../hooks/useTitle";
import {selectCurrentToken} from "../auth/authSlice";
import {useGetUserBookingQuery} from "./bookingApiSlice";

const Bookings = () => {
  useTitle("Bookings");

  const token = useSelector(selectCurrentToken);
  const decoded = jwtDecode(token);
  const {id} = decoded.UserInfo;

  const {data: bookings, isLoading} = useGetUserBookingQuery(id);

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
                You have not any ratings yet.
              </h2>
            ) : (
              <Container className="my-5">
                <h2 className="mb-4 fw-bold">My Bookings</h2>
                <Row>
                  <Col>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Hotel</th>
                          <th>Payment</th>
                          <th>Is Paid</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings?.map((booking) => (
                          <tr key={booking._id}>
                            <td>{booking._id}</td>
                            <td>{booking.hotel.title}</td>
                            <td>{booking.paymentResult.status}</td>
                            <td>{booking.isPaid ? "Paid" : "Not Paid"}</td>
                            <td>{booking.startDate}</td>
                            <td>{booking.endDate}</td>
                            <td>{booking.price}</td>
                            <td>{booking.status}</td>
                            <td>{booking.createdAt}</td>
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

export default Bookings;
