import {useTitle} from "../../hooks";
import {useGetCategoriesQuery} from "../../app/features/category/categoryApiSlice";
import {CreateHotelForm, Loading} from "../../components";

const AdminCreateHotel = () => {
  useTitle("Create Hotel");

  const {category} = useGetCategoriesQuery("categoryList", {
    selectFromResult: ({data}) => ({
      category: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!category?.length) {
    return <Loading />;
  }

  return <CreateHotelForm category={category} />;
};

export default AdminCreateHotel;
