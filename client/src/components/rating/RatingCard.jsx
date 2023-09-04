import {Card, Col} from "react-bootstrap";
import propTypes from "prop-types";

import {useGetRatingsQuery} from "../../app/features/rating/ratingApiSlice";

const RatingCard = ({ratingId, id}) => {
  const {rating} = useGetRatingsQuery(`${id}`, {
    selectFromResult: ({data}) => ({rating: data?.entities[ratingId]}),
  });

  return (
    <>
      <Col key={rating._id} className="my-3">
        <Card style={{width: "18rem"}}>
          <Card.Img variant="top" src={rating?.user?.image} />
          <Card.Body>
            <Card.Text className="mb-2" style={{fontSize: "18px"}}>
              <span className="fw-bold">Username: </span>
              {rating?.user?.username}
            </Card.Text>
            <Card.Text className="mb-2" style={{fontSize: "18px"}}>
              <span className="fw-bold">Email: </span>
              {rating?.user.email}
            </Card.Text>
            <Card.Text className="mb-2" style={{fontSize: "18px"}}>
              <span className="fw-bold">Comment: </span>
              {rating.comment}
            </Card.Text>
            <Card.Text className="mb-2" style={{fontSize: "18px"}}>
              <span className="fw-bold">Rating: </span>
              {rating.rating}
            </Card.Text>
            <Card.Text className="mb-2" style={{fontSize: "18px"}}>
              <span className="fw-bold">Created At: </span>
              {rating.createdAt}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

RatingCard.propTypes = {
  ratingId: propTypes.string,
  id: propTypes.string,
};

export default RatingCard;
