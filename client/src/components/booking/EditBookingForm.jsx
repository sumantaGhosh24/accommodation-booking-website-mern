import {useEffect, useState} from "react";
import {Badge, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import propTypes from "prop-types";

import {useUpdateBookingMutation} from "../../app/features/booking/bookingApiSlice";
import {Loading} from "../";

const EditBookingForm = ({booking}) => {
  const [updateBooking, {isLoading, isSuccess}] = useUpdateBookingMutation();

  const navigate = useNavigate();

  const [isPaid, setIsPaid] = useState(booking?.isPaid);
  const [status, setStatus] = useState(booking?.status);

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin-booking");
    }
  }, [isSuccess, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {message} = await updateBooking({
        id: booking._id,
        isPaid,
        status,
      }).unwrap();
      toast.success(message, {toastId: "booking-success"});
    } catch (error) {
      toast.error(error?.data?.message, {toastId: "booking-error"});
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col>
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
                  name="paid"
                  value={isPaid}
                  onChange={(e) => setIsPaid(e.target.value)}
                >
                  <option value={true}>Paid</option>
                  <option value={false}>Not Paid</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={status}
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

EditBookingForm.propTypes = {
  booking: propTypes.object,
};

export default EditBookingForm;
