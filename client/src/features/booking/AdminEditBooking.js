import React, {useState} from "react";
import {Badge, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import {toast, ToastContainer} from "react-toastify";

import useTitle from "../../hooks/useTitle";
import {
  useGetSingleBookingQuery,
  useUpdateBookingMutation,
} from "./bookingApiSlice";

const AdminEditBooking = () => {
  useTitle("Booking Details");

  const {id} = useParams();
  const navigate = useNavigate();

  const [isPaid, setIsPaid] = useState(null);
  const [status, setStatus] = useState("");

  const {data: booking, isLoading} = useGetSingleBookingQuery(id);

  const [updateBooking, {isLoading: updateLoading}] =
    useUpdateBookingMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {message} = await updateBooking({id, isPaid, status}).unwrap();
      toast.success(message);
      setTimeout(() => {
        navigate(`/admin-booking/${id}`);
      }, 1000);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      <ToastContainer />
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
            {updateLoading && (
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
            {!booking && (
              <h2 className="text-center fw-bold mt-5">
                Something went wrong, please try again later.
              </h2>
            )}
            <Card className="mb-5">
              <Card.Body>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Booking User: </span>
                  {booking?.user?.email} || {booking?.user?.mobileNumber} ||{" "}
                  {booking?.user?.username} || {booking?.user?.image}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Booking Hotel: </span>
                  {booking?.hotel?.title}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Price: </span>
                  {booking?.price}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Paid: </span>
                  {booking?.isPaid ? (
                    <Badge bg="success">Paid</Badge>
                  ) : (
                    <Badge bg="danger">Not Paid</Badge>
                  )}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Payment Status: </span>
                  {booking?.paymentResult?.status}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Start Date: </span>
                  {booking?.startDate}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">End Date: </span>
                  {booking?.endDate}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Status: </span>
                  {booking?.status}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Updated At: </span>
                  {booking?.updatedAt}
                </Card.Text>
              </Card.Body>
            </Card>
            <Form
              onSubmit={handleUpdate}
              style={{
                backgroundColor: "#eee",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Is Paid</Form.Label>
                <Form.Select
                  name="active"
                  onChange={(e) => setIsPaid(e.target.value)}
                >
                  <option value={true}>Paid</option>
                  <option value={false}>Not Paid</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="role"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                  <option value="fail">Fail</option>
                  <option value="pending">Pending</option>
                  <option value="cancel">Cancel</option>
                </Form.Select>
              </Form.Group>
              <Button variant="warning" size="lg" type="submit">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminEditBooking;
