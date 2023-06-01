import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Button, Col, Container, Image, Row, Form} from "react-bootstrap";

import {useCreateHotelMutation} from "../../app/features/hotel/hotelApiSlice";
import {convertToBase64} from "../../lib";
import {Loading} from "../../components";

const CreateHotelForm = ({category}) => {
  const navigate = useNavigate();

  const [hotel, setHotel] = useState({
    title: "",
    description: "",
    content: "",
    images: [
      "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
    ],
    category: "",
    price: "",
    country: "",
    city: "",
    zip: "",
    address: "",
    latitude: "",
    longitude: "",
    state: "",
  });

  const [createHotel, {isLoading, isSuccess, isError, error}] =
    useCreateHotelMutation();

  const handleFile = async (e) => {
    const file = e.target.files;
    let imgArr = [];
    for (let i = 0; i < file.length; i++) {
      let base64 = await convertToBase64(file[i]);
      imgArr.push(base64);
    }
    setHotel({...hotel, images: imgArr});
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setHotel({...hotel, [name]: value});
  };

  useEffect(() => {
    if (isSuccess) {
      setHotel({
        title: "",
        description: "",
        content: "",
        images: [
          "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
        ],
        category: "",
        price: "",
        country: "",
        city: "",
        zip: "",
        address: "",
        latitude: "",
        longitude: "",
        state: "",
      });
      navigate("/admin-hotel");
    }
  }, [isSuccess, navigate]);

  const handleCreateHotel = async (e) => {
    e.preventDefault();
    try {
      const {message} = await createHotel(hotel).unwrap();
      toast.success(message);
    } catch (error) {
      if (error.status === "FETCH_ERROR") {
        toast.error("server error");
      } else {
        if (typeof error.data.message === "object") {
          toast.error(error?.data?.message);
        } else {
          toast.error(error?.data?.message);
        }
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#eee",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <Row>
            <Col
              md={{span: 10, offset: 1}}
              className="bg-white p-5 rounded my-5"
            >
              <h2 className="text-center mb-4">Create Hotel</h2>
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
              <Form onSubmit={handleCreateHotel}>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter hotel title"
                    size="lg"
                    name="title"
                    onChange={handleChange}
                    value={hotel.title}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter hotel description"
                    size="lg"
                    name="description"
                    onChange={handleChange}
                    value={hotel.description}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel Content</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter hotel content"
                    size="lg"
                    name="content"
                    onChange={handleChange}
                    value={hotel.content}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel Category</Form.Label>
                  <Form.Select
                    name="category"
                    onChange={handleChange}
                    value={hotel.category}
                  >
                    <option>select hotel category</option>
                    {category.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter hotel price"
                    size="lg"
                    name="price"
                    onChange={handleChange}
                    value={hotel.price}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel Zip</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter hotel zip"
                    size="lg"
                    name="zip"
                    onChange={handleChange}
                    value={hotel.zip}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter hotel city"
                    size="lg"
                    name="city"
                    onChange={handleChange}
                    value={hotel.city}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter hotel state"
                    size="lg"
                    name="state"
                    onChange={handleChange}
                    value={hotel.state}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter hotel country"
                    size="lg"
                    name="country"
                    onChange={handleChange}
                    value={hotel.country}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter hotel address"
                    size="lg"
                    name="address"
                    onChange={handleChange}
                    value={hotel.address}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel Latitude</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter hotel latitude"
                    size="lg"
                    name="latitude"
                    onChange={handleChange}
                    value={hotel.latitude}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hotel Longitude</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter hotel longitude"
                    size="lg"
                    name="longitude"
                    onChange={handleChange}
                    value={hotel.longitude}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" size="lg">
                  Create Hotel
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CreateHotelForm;
