import React from "react";
import {Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

const HotelCard = ({hotel}) => {
  function getWordStr(str, len) {
    return str.split(/\s+/).slice(0, len).join(" ");
  }

  return (
    <>
      <Col key={hotel._id}>
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
            <Link
              to={`/hotels/${hotel._id}`}
              className="btn btn-primary btn-lg"
            >
              Hotel Details
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
};

export default HotelCard;
