import React, {useState} from "react";
import {Button, Col, Container, Form, Image, Row, Table} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import {toast, ToastContainer} from "react-toastify";

import useTitle from "../../hooks/useTitle";
import {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
} from "./categoryApiSlice";

const AdminCategoryList = () => {
  useTitle("Category");

  const location = useLocation();

  const [catData, setCatData] = useState({
    image:
      "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
    name: "",
  });

  const [createCategory, {isLoading: createLoading}] =
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

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const {message} = await createCategory(catData).unwrap();
      setCatData({
        image:
          "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
        name: "",
      });
      toast.success(message);
      setTimeout(() => {
        location("/admin-users");
      }, 2000);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const {data: category, isLoading} = useGetAllCategoryQuery();

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
            {category?.categories?.length === 0 ? (
              <h2 className="text-center fw-bold mt-5">
                You have not any category yet.
              </h2>
            ) : (
              <Container className="my-5">
                <h2 className="mb-4 fw-bold">All Category</h2>
                <Row>
                  <Col>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Image</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category?.categories?.map((cat) => (
                          <tr key={cat._id}>
                            <td>{cat._id}</td>
                            <td>{cat.name}</td>
                            <td>
                              <img
                                src={cat.image}
                                alt={cat.name}
                                style={{
                                  height: "50px",
                                  width: "50px",
                                  borderRadius: "50px",
                                }}
                              />
                            </td>
                            <td>{cat.createdAt}</td>
                            <td>{cat.updatedAt}</td>
                            <td>
                              <Link
                                className="btn btn-primary"
                                to={`/admin-category/${cat._id}`}
                              >
                                Manage Category
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Container>
            )}
          </Col>
          <Col>
            {createLoading && (
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
            <h2 className="text-center mb-4">Create Category</h2>
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
