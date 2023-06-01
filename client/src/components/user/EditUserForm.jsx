import {useEffect, useState} from "react";
import {Badge, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../app/features/user/usersApiSlice";
import Loading from "../common/Loading";

const EditUserForm = ({user}) => {
  const [updateUser, {isLoading, isSuccess, isError, error}] =
    useUpdateUserMutation();

  const [deleteUser, {isSuccess: isDelSuccess}] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [active, setActive] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setActive("");
      setRole("");
      navigate("/admin-users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {message} = await updateUser({
        id: user.id,
        active,
        role,
      }).unwrap();
      toast.success(message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const {message} = await deleteUser({id: user.id}).unwrap();
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
              <Card.Img
                src={user?.image}
                alt={user?.username}
                style={{height: "250px"}}
              />
              <Card.Body>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">First Name: </span>
                  {user?.firstName}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Last Name: </span>
                  {user?.lastName}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Username: </span>
                  {user?.username}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Email: </span>
                  {user?.email}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Mobile Number: </span>
                  {user?.mobileNumber}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">City: </span>
                  {user?.city}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">State: </span>
                  {user?.state}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Country: </span>
                  {user?.country}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Zip: </span>
                  {user?.zip}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Address Line 1: </span>
                  {user?.addressline1}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Address Line 2: </span>
                  {user?.addressline2}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Created At: </span>
                  {user?.createdAt}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">DOB: </span>
                  {user?.dob}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Gender: </span>
                  {user?.gender}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Active: </span>
                  {user?.active === "active" ? (
                    <Badge bg="success" className="p-2">
                      Active
                    </Badge>
                  ) : (
                    <Badge bg="danger" className="p-2">
                      Inactive
                    </Badge>
                  )}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Role: </span>
                  {user?.role}
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
                <Form.Label>Active</Form.Label>
                <Form.Select
                  name="active"
                  onChange={(e) => setActive(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
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

export default EditUserForm;
