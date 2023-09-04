import {Row} from "react-bootstrap";
import propTypes from "prop-types";

import {useGetRatingsQuery} from "../../app/features/rating/ratingApiSlice";
import {Loading, RatingCard} from "../";

const HotelRating = ({id}) => {
  const {
    data: rating,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRatingsQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  let content;

  if (isError) {
    content = (
      <h3 className="text-cl font-bold capitalize mb-10">{error.message}</h3>
    );
  }

  if (isSuccess) {
    const {ids} = rating;
    const tableContent =
      ids?.length &&
      ids.map((ratingId) => (
        <RatingCard key={ratingId} ratingId={ratingId} id={id} />
      ));

    content = (
      <>
        <h2 className="fw-bold mt-5">Hotel Ratings</h2>
        <Row xl={4} lg={3} sm={2}>
          {tableContent}
        </Row>
      </>
    );
  }

  return <>{content}</>;
};

HotelRating.propTypes = {
  id: propTypes.string,
};

export default HotelRating;
