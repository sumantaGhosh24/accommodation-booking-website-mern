import {useState} from "react";
import {Badge, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

import {useTitle} from "../../hooks";
import {useGetHotelsQuery} from "../../app/features/hotel/hotelApiSlice";
import {
  useGetRazorpayMutation,
  useVerificationMutation,
} from "../../app/features/payment/paymentApiSlice";
import {RAZORPAY_KEY} from "../../config";
import {CreateRatingForm, HotelRating, Loading} from "../../components";

const HotelDetailed = () => {
  useTitle("Hotel Detailed");

  const {id} = useParams();

  const {hotel} = useGetHotelsQuery("hotelList", {
    selectFromResult: ({data}) => ({
      hotel: data?.entities[id],
    }),
  });

  if (!hotel) {
    return <Loading />;
  }

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [getRazorpay] = useGetRazorpayMutation();

  const [verification] = useVerificationMutation();

  const checkoutHandler = async (price) => {
    const result = await getRazorpay({price}).unwrap();

    if (!result) {
      alert("something went wrong please try again later.");
      return;
    }

    const {amount, id: order_id, currency} = result;

    const options = {
      key: RAZORPAY_KEY,
      amount: Number(amount),
      currency: currency,
      order_id: order_id,
      name: "Accommodation Booking Website",
      description:
        "This is test accommodation booking website for only tutorial purpose.",
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          hotel: hotel?._id,
          price: hotel?.price,
          startDate,
          endDate,
        };
        const result = await verification(data).unwrap();
        alert(result.data.msg);
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col>
            <Row>
              <Col sx={{span: 8, offset: 2}}>
                <Card>
                  <Card.Body>
                    <Card.Text
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {hotel?.title}
                    </Card.Text>
                    <div className="my-4">
                      {hotel?.images?.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="hotel"
                          className="m-3"
                          style={{
                            height: "130px",
                            width: "130px",
                            borderRadius: "25px",
                          }}
                        />
                      ))}
                    </div>
                    <div
                      className="my-3"
                      style={{
                        border: "1px solid gray",
                        width: "250px",
                        borderRadius: "20px",
                        padding: "10px",
                      }}
                    >
                      <p className="fw-bold" style={{fontSize: "24px"}}>
                        Category:
                      </p>
                      <div className="ml-5">
                        <img
                          src={hotel?.category?.image}
                          alt={hotel?.category?.name}
                          style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "50px",
                          }}
                        />
                        <p className="fw-bold">{hotel?.category?.name}</p>
                      </div>
                    </div>
                    <div
                      className="my-3"
                      style={{
                        border: "1px solid gray",
                        width: "300px",
                        borderRadius: "20px",
                        padding: "10px",
                      }}
                    >
                      <p className="fw-bold" style={{fontSize: "24px"}}>
                        Owner:{" "}
                      </p>
                      <div>
                        <img
                          src={hotel?.owner?.image}
                          alt={hotel?.owner?.email}
                          style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "50px",
                          }}
                        />
                      </div>
                      <p className="mt-3">
                        <span className="fw-bold">Email: </span>{" "}
                        {hotel?.owner?.email}
                      </p>
                      <p>
                        <span className="fw-bold">Username: </span>{" "}
                        {hotel?.owner?.username}
                      </p>
                      <p>
                        <span className="fw-bold">Mobile Number: </span>{" "}
                        {hotel?.owner?.mobileNumber}
                      </p>
                    </div>
                    {hotel?.verified ? (
                      <Badge bg="success" className="my-3 p-3 fs-5">
                        Verified by Admin
                      </Badge>
                    ) : (
                      <Badge bg="danger" className="my-3 p-3 fs-5">
                        Not Verified
                      </Badge>
                    )}
                    <Card.Text
                      style={{fontSize: "24px", textTransform: "capitalize"}}
                      className="mb-3"
                    >
                      <span className="fw-bold">Content: </span>
                      {hotel?.content}
                    </Card.Text>
                    <Card.Text
                      style={{fontSize: "24px", textTransform: "capitalize"}}
                      className="mb-3"
                    >
                      <span className="fw-bold">Description: </span>
                      {hotel?.description}
                    </Card.Text>
                    <Card.Text
                      style={{fontSize: "24px", textTransform: "capitalize"}}
                      className="mb-3"
                    >
                      <span className="fw-bold">Price: </span>
                      {hotel?.price}
                    </Card.Text>
                    <Card.Text
                      style={{fontSize: "24px", textTransform: "capitalize"}}
                      className="mb-3"
                    >
                      <span className="fw-bold">Address: </span>
                      {hotel?.address}
                    </Card.Text>
                    <Card.Text
                      style={{fontSize: "24px", textTransform: "capitalize"}}
                      className="mb-3"
                    >
                      <span className="fw-bold">Zip: </span>
                      {hotel?.zip}
                    </Card.Text>
                    <Card.Text
                      style={{fontSize: "24px", textTransform: "capitalize"}}
                      className="mb-3"
                    >
                      <span className="fw-bold">City: </span>
                      {hotel?.city}
                    </Card.Text>
                    <Card.Text
                      style={{fontSize: "24px", textTransform: "capitalize"}}
                      className="mb-3"
                    >
                      <span className="fw-bold">State: </span>
                      {hotel?.state}
                    </Card.Text>
                    <Card.Text
                      style={{fontSize: "24px", textTransform: "capitalize"}}
                      className="mb-3"
                    >
                      <span className="fw-bold">Country: </span>
                      {hotel?.country}
                    </Card.Text>
                    <Card.Text
                      style={{fontSize: "24px", textTransform: "capitalize"}}
                      className="mb-3"
                    >
                      <span className="fw-bold">Latitude: </span>
                      {hotel?.latitude}
                    </Card.Text>
                    <Card.Text
                      style={{fontSize: "24px", textTransform: "capitalize"}}
                      className="mb-3"
                    >
                      <span className="fw-bold">Longitude: </span>
                      {hotel?.longitude}
                    </Card.Text>
                    <Form.Group className="my-3">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="my-3">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => checkoutHandler(hotel?.price)}
                      disabled={!startDate || !endDate}
                    >
                      Add Booking
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <CreateRatingForm id={id} />
        <HotelRating id={id} />
      </Container>
    </>
  );
};

export default HotelDetailed;
