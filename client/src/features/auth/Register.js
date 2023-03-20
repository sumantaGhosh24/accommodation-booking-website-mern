import React, {useState} from "react";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import {ToastContainer, toast} from "react-toastify";

import useTitle from "../../hooks/useTitle";
import {useRegisterMutation} from "./authApiSlice";
import {PublicHeader} from "../../components";

const Register = () => {
  useTitle("Register");

  const [user, setUser] = useState({
    image:
      "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
    email: "",
    mobileNumber: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    dob: "",
    gender: "",
    city: "",
    country: "",
    state: "",
    zip: "",
    addressline1: "",
    addressline2: "",
  });

  const navigate = useNavigate();

  const [register, {isLoading}] = useRegisterMutation();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUser({...user, image: base64});
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const {message} = await register(user).unwrap();
      setUser({
        image:
          "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
        email: "",
        mobileNumber: "",
        password: "",
        firstName: "",
        lastName: "",
        username: "",
        dob: "",
        gender: "",
        city: "",
        country: "",
        state: "",
        zip: "",
        addressline1: "",
        addressline2: "",
      });
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        delay: 300,
      });
      setInterval(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        toast.error("server error", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 7000,
          pauseOnFocusLoss: true,
          toastId: "register-error",
          delay: 300,
        });
      } else {
        if (typeof err.data.message === "object") {
          toast.error(err?.data?.message[0], {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 7000,
            pauseOnFocusLoss: true,
            toastId: "register-error",
            delay: 300,
          });
        } else {
          toast.error(err?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 7000,
            pauseOnFocusLoss: true,
            toastId: "register-error",
            delay: 300,
          });
        }
      }
    }
  };

  if (isLoading) {
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

  return (
    <>
      <PublicHeader />
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
              <ToastContainer limit={5} />
              <h2 className="text-center mb-4">Register User</h2>
              <div className="d-flex align-items-center justify-content-center mb-3">
                <Image src={user.image} alt="profile" thumbnail roundedCircle />
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Upload your profile picture</Form.Label>
                <Form.Control type="file" size="lg" onChange={handleFile} />
              </Form.Group>
              <Form onSubmit={handleRegister}>
                <Row>
                  <Col lg={{span: 6}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        size="lg"
                        name="email"
                        onChange={handleChange}
                        value={user.email}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={{span: 6}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter mobile number"
                        size="lg"
                        name="mobileNumber"
                        onChange={handleChange}
                        value={user.mobileNumber}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={{span: 6}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        size="lg"
                        name="password"
                        onChange={handleChange}
                        value={user.password}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={{span: 6}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        size="lg"
                        name="username"
                        onChange={handleChange}
                        value={user.username}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={{span: 6}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        size="lg"
                        name="firstName"
                        onChange={handleChange}
                        value={user.firstName}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={{span: 6}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        size="lg"
                        name="lastName"
                        onChange={handleChange}
                        value={user.lastName}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={{span: 6}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>DOB</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Enter your dob"
                        size="lg"
                        name="dob"
                        onChange={handleChange}
                        value={user.dob}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={{span: 6}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="gender"
                        onChange={handleChange}
                        value={user.gender}
                      >
                        <option>select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={{span: 4}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your city"
                        size="lg"
                        name="city"
                        onChange={handleChange}
                        value={user.city}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={{span: 4}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your country"
                        size="lg"
                        name="country"
                        onChange={handleChange}
                        value={user.country}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={{span: 4}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your state"
                        size="lg"
                        name="state"
                        onChange={handleChange}
                        value={user.state}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={{span: 4}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your zip"
                        size="lg"
                        name="zip"
                        onChange={handleChange}
                        value={user.zip}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={{span: 4}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>Address Line 1</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your address line 1"
                        size="lg"
                        name="addressline1"
                        onChange={handleChange}
                        value={user.addressline1}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={{span: 4}} md={{span: 12}}>
                    <Form.Group className="mb-3">
                      <Form.Label>Address Line 2</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your address line 2"
                        size="lg"
                        name="addressline2"
                        onChange={handleChange}
                        value={user.addressline2}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit" size="lg">
                  Register
                </Button>
              </Form>
              <p className="mt-4 h5">
                Already have an account? <Link to="/login">login</Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Register;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
