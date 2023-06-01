import {useParams} from "react-router-dom";

import {useTitle} from "../../hooks";
import {useGetCategoriesQuery} from "../../app/features/category/categoryApiSlice";
import {EditCategoryForm, Loading} from "../../components";

const AdminUpdateCategory = () => {
  useTitle("Update and Delete Category");

  const {id} = useParams();

  const {category} = useGetCategoriesQuery("categoryList", {
    selectFromResult: ({data}) => ({
      category: data?.entities[id],
    }),
  });

  if (!category) return <Loading />;

  return <EditCategoryForm category={category} />;
};

export default AdminUpdateCategory;
