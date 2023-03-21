import React, {useState} from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  ToastContainer,
} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import {toast} from "react-toastify";

import useTitle from "../../hooks/useTitle";
import {
  useDeleteRatingMutation,
  useGetSingleRatingQuery,
  useUpdateRatingMutation,
} from "./ratingApiSlice";

const Rating = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    comment: "",
    rating: 0,
  });

  useTitle("Rating Details");

  const {data: rating, isLoading} = useGetSingleRatingQuery(id);

  const [updateRating, {isLoading: updateLoading}] = useUpdateRatingMutation();

  const [deleteRating] = useDeleteRatingMutation();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]: value});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {message} = await updateRating({
        id,
        comment: data.comment,
        rating: data.rating,
      }).unwrap();
      setData({
        comment: "",
        rating: "",
      });
      toast.success(message);
      setTimeout(() => {
        navigate(`/ratings`);
      }, 1000);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const {message} = await deleteRating(id).unwrap();
      toast.success(message);
      setTimeout(() => {
        navigate("/ratings");
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
            {!rating && (
              <h2 className="text-center fw-bold mt-5">
                Something went wrong, please try again later.
              </h2>
            )}
            <Card className="mb-5">
              <Card.Body>
                <Card.Text className="mb-3" style={{fontSize: "24px"}}>
                  <span className="fw-bold">Comment: </span>
                  {rating?.comment}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Rating: </span>
                  {rating?.rating}{" "}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Created At: </span>
                  {rating?.createdAt}{" "}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Updated At: </span>
                  {rating?.updatedAt}{" "}
                </Card.Text>
                <Card.Text className="mb-3" style={{fontSize: "20px"}}>
                  <span className="fw-bold">Hotel: </span>
                  {rating?.hotel?.title}
                  <br />
                  <Link to={`/hotels/${rating?.hotel?._id}`}>visit hotel</Link>
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
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="comment"
                  placeholder={rating?.comment}
                  value={data.comment}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="5"
                  name="rating"
                  value={data.rating}
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

export default Rating;
