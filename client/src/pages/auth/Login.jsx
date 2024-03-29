import {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {useTitle, usePersist} from "../../hooks";
import {useLoginMutation} from "../../app/features/auth/authApiSlice";
import {setCredentials} from "../../app/features/auth/authSlice";
import {Loading, PublicHeader} from "../../components";

const Login = () => {
  useTitle("Login");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading}] = useLoginMutation();

  const handleToggle = () => setPersist((prev) => !prev);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const {accessToken} = await login(user).unwrap();
      dispatch(setCredentials({accessToken}));
      setUser({
        email: "",
        password: "",
      });
      toast.success("login successful", {
        toastId: "login-success",
      });
      navigate("/welcome");
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        toast.error("server error", {
          toastId: "login-error",
        });
      } else {
        if (typeof err.data.message === "object") {
          toast.error(err?.data?.message[0], {
            toastId: "login-error",
          });
        } else {
          toast.error(err?.data?.message, {
            toastId: "login-error",
          });
        }
      }
    }
  };

  if (isLoading) {
    return <Loading />;
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
              md={{span: 8, offset: 2}}
              className="bg-white p-5 rounded my-5"
            >
              <h2 className="text-center mb-4">Login User</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    size="lg"
                    name="email"
                    onChange={handleChange}
                    value={user.email}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    size="lg"
                    name="password"
                    onChange={handleChange}
                    value={user.password}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="persist"
                    onChange={handleToggle}
                    checked={persist}
                    label="Trust this website"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" size="lg">
                  Login
                </Button>
              </Form>
              <p className="mt-4 h5">
                Don&apos;t have an account? <Link to="/register">register</Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
