import {useState, useEffect} from "react";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {useTitle} from "../../hooks";
import {useCreateCategoryMutation} from "../../app/features/category/categoryApiSlice";
import {convertToBase64} from "../../lib";
import {Loading} from "../../components";

const AdminCategoryList = () => {
  useTitle("Create Category");

  const navigate = useNavigate();

  const [catData, setCatData] = useState({
    image:
      "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
    name: "",
  });

  const [createCategory, {isLoading, isSuccess, isError, error}] =
    useCreateCategoryMutation();

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
    if (isSuccess) {
      setCatData({
        image:
          "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
        name: "",
      });
      navigate("/admin-category");
    }
  }, [isSuccess, navigate]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const {message} = await createCategory(catData).unwrap();
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
            <h2 className="text-center mb-4">Create Category</h2>
            {isError && (
              <h3 className="text-center text-danger text-capitalize fw-bold mb-3">
                {error.message}
              </h3>
            )}
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
            <Form onSubmit={handleCreateCategory}>
              <Form.Group className="mb-3">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category name"
                  size="lg"
                  name="name"
                  onChange={handleChange}
                  value={catData.name}
                />
              </Form.Group>
              <Button variant="primary" type="submit" size="lg">
                Create Category
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminCategoryList;
