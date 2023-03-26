import React, {useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import {toast, ToastContainer} from "react-toastify";

import useTitle from "../../hooks/useTitle";
import {
  useDeleteCategoryMutation,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "./categoryApiSlice";

const AdminEditCategory = () => {
  useTitle("Category Details");

  const {id} = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const {data: category, isLoading} = useGetSingleCategoryQuery(id);

  const [updateCategory, {isLoading: updateLoading}] =
    useUpdateCategoryMutation();

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {message} = await updateCategory({id, name}).unwrap();
      toast.success(message);
      setTimeout(() => {
        navigate(`/admin-category/${id}`);
      }, 1000);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const {message} = await deleteCategory(id).unwrap();
      toast.success(message);
      setTimeout(() => {
        navigate("/admin-category");
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
            {!category && (
              <h2 className="text-center fw-bold mt-5">
                Something went wrong, please try again later.
              </h2>
            )}
            <Card className="mb-5">
              <Card.Img
                src={category?.image}
                alt={category?.name}
                style={{height: "250px"}}
              />
              <Card.Body>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Category: </span> {category?.name}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Created At: </span>{" "}
                  {category?.createdAt}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Updated At: </span>{" "}
                  {category?.updatedAt}
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
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder={category?.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="warning"
                size="lg"
                type="submit"
                disabled={!name}
              >
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminEditCategory;
