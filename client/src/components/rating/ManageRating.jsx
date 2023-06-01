import {Link} from "react-router-dom";

import {useGetAllRatingsQuery} from "../../app/features/rating/ratingApiSlice";

const ManageRating = ({ratingId, ind}) => {
  const {rating} = useGetAllRatingsQuery("ratingList", {
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
          <Link to={`/admin-hotel/${rating?.hotel?._id}`}>visit hotel</Link>
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

export default ManageRating;
