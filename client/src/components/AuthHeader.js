import jwtDecode from "jwt-decode";
import React, {useEffect} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useSelector} from "react-redux";
import {Link, Navigate, useNavigate} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import {toast, ToastContainer} from "react-toastify";
import {useSendLogoutMutation} from "../features/auth/authApiSlice";

import {selectCurrentToken} from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();

  const token = useSelector(selectCurrentToken);
  const decoded = jwtDecode(token);
  const {role} = decoded.UserInfo;
  let navLinks;

  const [sendLogout, {isLoading, isSuccess, isError, error}] =
    useSendLogoutMutation();

  if (role === "admin") {
    navLinks = (
      <>
        <Link to="/dashboard" className="nav-link text-white">
          Dashboard
        </Link>
        <Link to="/admin-users" className="nav-link text-white">
          Users
        </Link>
        <Link to="/admin-category" className="nav-link text-white">
          Category
        </Link>
        <Link to="/admin-hotel" className="nav-link text-white">
          Hotel
        </Link>
        <Link to="/admin-rating" className="nav-link text-white">
          Rating
        </Link>
        <Link to="/admin-booking" className="nav-link text-white">
          Booking
        </Link>
      </>
    );
  }

  if (role === "user") {
    navLinks = (
      <>
        <Link to="/welcome" className="nav-link text-white">
          Home
        </Link>
        <Link to="/hotels" className="nav-link text-white">
          Hotels
        </Link>
        <Link to="/profile" className="nav-link text-white">
          Profile
        </Link>
        <Link to="/ratings" className="nav-link text-white">
          Rating
        </Link>
        <Link to="/booking" className="nav-link text-white">
          Booking
        </Link>
      </>
    );
  }

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess, navigate]);

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

  if (isError) {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 7000,
      pauseOnFocusLoss: true,
      toastId: "logout-error",
      delay: 300,
    });
  }

  return (
    <>
      <ToastContainer />
      <Navbar bg="primary" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="text-white">
            Accommodation
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {navLinks}
              <Nav.Link className="text-white" onClick={sendLogout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
