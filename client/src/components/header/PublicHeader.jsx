import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const PublicHeader = () => {
  return (
    <>
      <Navbar bg="primary" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="text-white">
            Accommodation
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/" className="nav-link text-white">
                Home
              </Link>
              <Link to="/login" className="nav-link text-white">
                Login
              </Link>
              <Link to="/register" className="nav-link text-white">
                Register
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default PublicHeader;
