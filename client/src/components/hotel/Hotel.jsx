import {Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

import {useGetHotelsQuery} from "../../app/features/hotel/hotelApiSlice";
import {getWordStr} from "../../lib";

const Hotel = ({hotelId}) => {
  const {hotel} = useGetHotelsQuery("hotelList", {
    selectFromResult: ({data}) => ({hotel: data?.entities[hotelId]}),
  });

  if (hotel) {
    return (
      <Col>
        <Card>
          <Card.Img variant="top" src={hotel.images[0]} />
          <Card.Body>
            <Card.Title className="text-capitalize fs-2 mb-4">
              {getWordStr(hotel.title, 5)}
            </Card.Title>
            <Card.Text className="text-capitalize text-small">
              {getWordStr(hotel.description, 10)}
            </Card.Text>
            <Card.Text className="text-capitalize fs-5 fw-bold">
              {hotel.address}, {hotel.zip}, {hotel.city}, {hotel.country}
            </Card.Text>
            <Card.Text className="text-capitalize">
              Latitude: {hotel.latitude}, Longitude: {hotel.longitude}
            </Card.Text>
            <Card.Text className="text-capitalize fw-bold">
              Price: {hotel.price}
            </Card.Text>
            <Card.Text
              className={`text-capitalize fw-bold ${
                hotel.verified ? "text-success" : "text-danger"
              }`}
            >
              {hotel.verified ? "Verified by Admin" : "Not Verified"}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Link to={`/hotel/${hotel._id}`} className="btn btn-primary btn-lg">
              Hotel Details
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    );
  } else return null;
};

export default Hotel;
