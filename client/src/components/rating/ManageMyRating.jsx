import {Link} from "react-router-dom";

import {useGetMyRatingsQuery} from "../../app/features/rating/ratingApiSlice";

const ManageMyRating = ({ratingId, ind}) => {
  const {rating} = useGetMyRatingsQuery("ratingList", {
    selectFromResult: ({data}) => ({rating: data?.entities[ratingId]}),
  });

  if (rating) {
    return (
      <tr>
        <td>{ind}</td>
        <td>{rating.id}</td>
        <td>{rating.comment}</td>
        <td>{rating.rating}</td>
        <td>
          {rating?.hotel?.title}
          <Link to={`/hotel/${rating?.hotel?._id}`}>visit hotel</Link>
        </td>
        <td>
          {rating?.user?.email} || {rating?.user?.username}
        </td>
        <td>{rating.createdAt}</td>
        <td>{rating.updatedAt}</td>
      </tr>
    );
  } else return null;
};

export default ManageMyRating;
