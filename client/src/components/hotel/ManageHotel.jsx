import {Badge} from "react-bootstrap";
import {Link} from "react-router-dom";

import {useGetHotelsQuery} from "../../app/features/hotel/hotelApiSlice";
import {getWordStr} from "../../lib";

const ManageHotel = ({hotelId, ind}) => {
  const {hotel} = useGetHotelsQuery("hotelList", {
    selectFromResult: ({data}) => ({hotel: data?.entities[hotelId]}),
  });

  if (hotel) {
    return (
      <tr>
        <td>{ind}</td>
        <td>{hotel.id}</td>
        <td>{getWordStr(hotel.title, 5)}</td>
        <td>{getWordStr(hotel.description, 10)}</td>
        <td>{getWordStr(hotel.content, 20)}</td>
        <td>
          {hotel.images.map((image, i) => (
            <img
              src={image}
              alt={image}
              key={i}
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50px",
                marginBottom: "10px",
              }}
            />
          ))}
        </td>
        <td>{hotel.price}</td>
        <td>{hotel.city}</td>
        <td>{hotel.state}</td>
        <td>{hotel.country}</td>
        <td>{hotel.zip}</td>
        <td>{hotel.address}</td>
        <td>{hotel.latitude}</td>
        <td>{hotel.longitude}</td>
        <td>{hotel.category.name}</td>
        <td>{hotel.owner.email}</td>
        <td>
          {hotel.verified ? (
            <Badge bg="success">Verified by Admin</Badge>
          ) : (
            <Badge bg="danger">Not Verified</Badge>
          )}
        </td>
        <td>
          <Link className="btn btn-primary" to={`/admin-hotel/${hotel.id}`}>
            Manage Hotel
          </Link>
        </td>
      </tr>
    );
  }
};

export default ManageHotel;
