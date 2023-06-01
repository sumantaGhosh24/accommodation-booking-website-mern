import {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

import {useCreateRatingMutation} from "../../app/features/rating/ratingApiSlice";
import {Loading} from "../";

const CreateRatingForm = ({id}) => {
  const [createRating, {isLoading: createLoading}] = useCreateRatingMutation();

  if (createLoading) {
    return <Loading />;
  }

  const [ratingData, setRatingData] = useState({
    comment: "",
    rating: 0,
    id: id,
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRatingData({...ratingData, [name]: value});
  };

  const handleCreateRating = async (e) => {
    e.preventDefault();
    try {
      const {message} = await createRating(ratingData).unwrap();
      toast.success(message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      <Row className="mt-5">
        <Col>
          <h2 className="text-center mb-4 fw-bold">Create Rating</h2>
          <Form onSubmit={handleCreateRating}>
            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter your rating comment"
                size="lg"
                name="comment"
                onChange={handleChange}
                value={ratingData.comment}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter your rating value"
                size="lg"
                name="rating"
                onChange={handleChange}
                value={ratingData.rating}
              />
            </Form.Group>
            <Button variant="primary" type="submit" size="lg">
              Create Rating
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CreateRatingForm;
