import {Link} from "react-router-dom";
import propTypes from "prop-types";

import {useGetCategoriesQuery} from "../../app/features/category/categoryApiSlice";

const ManageCategory = ({catId, ind}) => {
  const {category} = useGetCategoriesQuery("categoryList", {
    selectFromResult: ({data}) => ({category: data?.entities[catId]}),
  });

  if (category) {
    return (
      <tr>
        <td>{ind}</td>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>
          <img
            src={category.image}
            alt={category.name}
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50px",
            }}
          />
        </td>
        <td>{category.createdAt}</td>
        <td>{category.updatedAt}</td>
        <td>
          <Link
            className="btn btn-primary"
            to={`/admin-category/${category.id}`}
          >
            Manage Category
          </Link>
        </td>
      </tr>
    );
  } else return null;
};

ManageCategory.propTypes = {
  catId: propTypes.string,
  ind: propTypes.number,
};

export default ManageCategory;
