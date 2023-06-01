import {useParams} from "react-router-dom";

import {useTitle} from "../../hooks";
import {useGetHotelsQuery} from "../../app/features/hotel/hotelApiSlice";
import {EditHotelForm, Loading} from "../../components";

const AdminUpdateHotel = () => {
  useTitle("Hotel Details");

  const {id} = useParams();

  const {hotel} = useGetHotelsQuery("hotelList", {
    selectFromResult: ({data}) => ({
      hotel: data?.entities[id],
    }),
  });

  if (!hotel) {
    return <Loading />;
  }

  return <EditHotelForm hotel={hotel} />;
};

export default AdminUpdateHotel;
