import React, {useState} from "react";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import {toast, ToastContainer} from "react-toastify";

import useTitle from "../../hooks/useTitle";
import {
  useDeleteHotelMutation,
  useGetHotelQuery,
  useUpdateHotelMutation,
} from "./hotelApiSlice";

const AdminEditHotel = () => {
  useTitle("Hotel Details");

  const {id} = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    content: "",
    price: "",
    country: "",
    city: "",
    zip: "",
    address: "",
    latitude: "",
    longitude: "",
    state: "",
    id,
  });

  const {data: hotel, isLoading} = useGetHotelQuery(id);

  const [updateHotel, {isLoading: updateLoading}] = useUpdateHotelMutation();

  const [deleteHotel] = useDeleteHotelMutation();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]: value});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {message} = await updateHotel(data).unwrap();
      toast.success(message);
      setTimeout(() => {
        navigate(`/admin-hotel/${id}`);
      }, 1000);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const {message} = await deleteHotel(id).unwrap();
      toast.success(message);
      setTimeout(() => {
        navigate("/admin-hotel");
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
            {!hotel?.hotel && (
              <h2 className="text-center fw-bold mt-5">
                Something went wrong, please try again later.
              </h2>
            )}
            <Card className="mb-5">
              <div className="d-flex align-items-center justify-content-center">
                {hotel?.hotel?.images.map((image, i) => (
                  <Image
                    src={image}
                    key={i}
                    alt={i}
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50px",
                    }}
                    className="mx-3 my-3"
                  />
                ))}
              </div>
              <Card.Body>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Title: </span> {hotel?.hotel?.title}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Description: </span>{" "}
                  {hotel?.hotel?.description}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Content: </span>{" "}
                  {hotel?.hotel?.content}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Price: </span> {hotel?.hotel?.price}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Zip: </span> {hotel?.hotel?.zip}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">City: </span> {hotel?.hotel?.city}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Country: </span>{" "}
                  {hotel?.hotel?.country}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">State: </span> {hotel?.hotel?.state}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Address: </span>{" "}
                  {hotel?.hotel?.address}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Latitude: </span>{" "}
                  {hotel?.hotel?.latitude}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Longitude: </span>{" "}
                  {hotel?.hotel?.longitude}
                </Card.Text>
                <Button variant="danger" size="lg" onClick={handleDelete}>
                  Delete
                </Button>
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
                <Form.Label>Hotel Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={hotel?.hotel?.title}
                  size="lg"
                  name="title"
                  onChange={handleChange}
                  value={data.title}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hotel Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={hotel?.hotel?.description}
                  size="lg"
                  name="description"
                  onChange={handleChange}
                  value={data.description}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hotel Content</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={hotel?.hotel?.content}
                  size="lg"
                  name="content"
                  onChange={handleChange}
                  value={data.content}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hotel Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={hotel?.hotel?.price}
                  size="lg"
                  name="price"
                  onChange={handleChange}
                  value={data.price}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hotel Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={hotel?.hotel?.zip}
                  size="lg"
                  name="zip"
                  onChange={handleChange}
                  value={data.zip}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hotel City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={hotel?.hotel?.city}
                  size="lg"
                  name="city"
                  onChange={handleChange}
                  value={data.city}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hotel State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={hotel?.hotel?.state}
                  size="lg"
                  name="state"
                  onChange={handleChange}
                  value={data.state}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hotel Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={hotel?.hotel?.country}
                  size="lg"
                  name="country"
                  onChange={handleChange}
                  value={data.country}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hotel Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={hotel?.hotel?.address}
                  size="lg"
                  name="address"
                  onChange={handleChange}
                  value={data.address}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hotel Latitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={hotel?.hotel?.latitude}
                  size="lg"
                  name="latitude"
                  onChange={handleChange}
                  value={data.latitude}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hotel Longitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={hotel?.hotel?.longitude}
                  size="lg"
                  name="longitude"
                  onChange={handleChange}
                  value={data.longitude}
                />
              </Form.Group>
              <Button variant="warning" type="submit" size="lg">
                Update Hotel
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminEditHotel;
