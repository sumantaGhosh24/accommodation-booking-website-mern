import {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {
  useDeleteHotelMutation,
  useUpdateHotelMutation,
} from "../../app/features/hotel/hotelApiSlice";
import {convertToBase64} from "../../lib";
import {Loading} from "../";

const EditHotelForm = ({hotel}) => {
  const [updateHotel, {isLoading, isSuccess, isError, error}] =
    useUpdateHotelMutation();

  const [deleteHotel, {isSuccess: isDelSuccess}] = useDeleteHotelMutation();

  const navigate = useNavigate();

  const [data, setData] = useState({
    title: hotel.title,
    description: hotel.description,
    content: hotel.content,
    price: hotel.price,
    country: hotel.country,
    city: hotel.city,
    zip: hotel.zip,
    address: hotel.address,
    latitude: hotel.latitude,
    longitude: hotel.longitude,
    state: hotel.state,
    id: hotel.id,
  });

  const handleFile = async (e) => {
    const file = e.target.files;
    let imgArr = [];
    for (let i = 0; i < file.length; i++) {
      let base64 = await convertToBase64(file[i]);
      imgArr.push(base64);
    }
    setData({...data, image: imgArr});
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]: value});
  };

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      navigate("/admin-hotel");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {message} = await updateHotel(data).unwrap();
      toast.success(message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const {message} = await deleteHotel({id: hotel.id}).unwrap();
      toast.success(message);
    } catch (error) {
      toast.error(error?.data?.message);
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
            {isError && (
              <h2 className="text-center fw-bold mt-5">{error.message}</h2>
            )}
            <Card className="mb-5">
              <div className="d-flex align-items-center justify-content-center">
                {hotel?.images.map((image, i) => (
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
                  <span className="fw-bold">Title: </span> {hotel?.title}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Description: </span>{" "}
                  {hotel?.description}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Content: </span> {hotel?.content}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Price: </span> {hotel?.price}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Zip: </span> {hotel?.zip}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">City: </span> {hotel?.city}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Country: </span> {hotel?.country}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">State: </span> {hotel?.state}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Address: </span> {hotel?.address}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Latitude: </span> {hotel?.latitude}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Longitude: </span>{" "}
                  {hotel?.longitude}
                </Card.Text>
                <Button variant="danger" size="lg" onClick={handleDelete}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <Image
                src={hotel.images[0]}
                alt="picture"
                thumbnail
                roundedCircle
              />
            </div>
            <Form.Group className="mb-3">
              <Form.Label>
                Upload your hotels image(min 5 image required)
              </Form.Label>
              <Form.Control
                type="file"
                size="lg"
                onChange={handleFile}
                multiple
              />
            </Form.Group>
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

export default EditHotelForm;
