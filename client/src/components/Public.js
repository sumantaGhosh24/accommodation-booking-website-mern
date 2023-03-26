import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import {ToastContainer, toast} from "react-toastify";

import {useGetHotelsQuery} from "../features/hotel/hotelApiSlice";
import useTitle from "../hooks/useTitle";
import PublicHeader from "./PublicHeader";

const Public = () => {
  useTitle("Public");

  const {data: hotels, isFetching, isLoading, isError} = useGetHotelsQuery();

  if (isLoading || isFetching) {
    return (
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
    );
  }

  if (isError) {
    toast.error("something went wrong, please try again later", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 7000,
      pauseOnFocusLoss: true,
      toastId: "hotels-error",
      delay: 300,
    });
  }

  return (
    <>
      <PublicHeader />
      <ToastContainer />
      {!hotels.hotels && (
        <h2 className="text-center fw-bold">Hotel not found!</h2>
      )}
      <Container className="my-5">
        <Row xs={1} md={2} className="g-4">
          {hotels.hotels.map((hotel) => (
            <Col key={hotel._id}>
              <Card>
                <Card.Img variant="top" src={hotel.images[0]} />
                <Card.Body>
                  <Card.Title className="text-capitalize fs-2 mb-4">
                    {hotel.title}
                  </Card.Title>
                  <Card.Text className="text-capitalize text-small">
                    {hotel.description}
                  </Card.Text>
                  <Card.Text className="text-capitalize fs-5 fw-bold">
                    {hotel.address}, {hotel.zip}, {hotel.city}, {hotel.country}
                  </Card.Text>
                  <Card.Text className="text-capitalize">
                    Latitude: {hotel.latitude}, Longitude: {hotel.longitude}
                  </Card.Text>
                  <Card.Text className="text-capitalize fw-bold">
                    Price: {hotel.price}
                  </Card.Text>
                  <Card.Text
                    className={`text-capitalize fw-bold ${
                      hotel.verified ? "text-success" : "text-danger"
                    }`}
                  >
                    {hotel.verified ? "Verified by Admin" : "Not Verified"}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  Login to book a hotel{" "}
                  <Link to="/login" className="fw-bold">
                    login
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Public;
