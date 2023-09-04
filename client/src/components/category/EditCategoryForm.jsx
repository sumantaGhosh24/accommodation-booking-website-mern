import {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import propTypes from "prop-types";

import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../app/features/category/categoryApiSlice";
import {convertToBase64} from "../../lib";
import {Loading} from "../";

const EditCategoryForm = ({category}) => {
  const [updateCategory, {isLoading, isSuccess, isError, error}] =
    useUpdateCategoryMutation();

  const [deleteCategory, {isSuccess: isDelSuccess}] =
    useDeleteCategoryMutation();

  const navigate = useNavigate();

  const [catData, setCatData] = useState({
    name: category?.name,
    image: category?.image,
  });

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setCatData({...catData, image: base64});
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCatData({...catData, [name]: value});
  };

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setCatData({
        name: "",
        image: "",
      });
      navigate("/admin-category");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {message} = await updateCategory({
        id: category.id,
        name: catData.name,
        image: catData.image,
      }).unwrap();
      toast.success(message, {toastId: "category-success"});
    } catch (error) {
      toast.error(error?.data?.message, {toastId: "category-error"});
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const {message} = await deleteCategory({id: category.id}).unwrap();
      toast.success(message, {toastId: "category-success"});
    } catch (error) {
      toast.error(error?.data?.message, {toastId: "category-error"});
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
              <h3 className="text-center fw-bold mt-5">{error.message}</h3>
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
            <div className="d-flex align-items-center justify-content-center mb-3">
              <Image
                src={catData.image}
                alt="category"
                thumbnail
                roundedCircle
              />
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Upload your category image</Form.Label>
              <Form.Control type="file" size="lg" onChange={handleFile} />
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
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={catData.name}
                  onChange={handleChange}
                />
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

EditCategoryForm.propTypes = {
  category: propTypes.object,
};

export default EditCategoryForm;
