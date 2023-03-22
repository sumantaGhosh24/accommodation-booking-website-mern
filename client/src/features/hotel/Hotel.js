import React from "react";
import {Badge, Button, Card, Col, Container, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

import {useGetHotelQuery} from "./hotelApiSlice";

const Hotel = () => {
  const {id} = useParams();

  const {data: hotel, isLoading} = useGetHotelQuery(id);

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col>
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                }}
              >
                <CircleLoader color="#0D6EFD" size={480} />
              </div>
            ) : (
              <Row>
                <Col sx={{span: 8, offset: 2}}>
                  <Card>
                    <Card.Body>
                      <Card.Text
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      >
                        {hotel?.hotel?.title}
                      </Card.Text>
                      <div className="my-4">
                        {hotel?.hotel?.images?.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt="hotel"
                            className="m-3"
                            style={{
                              height: "130px",
                              width: "130px",
                              borderRadius: "25px",
                            }}
                          />
                        ))}
                      </div>
                      <div
                        className="my-3"
                        style={{
                          border: "1px solid gray",
                          width: "250px",
                          borderRadius: "20px",
                          padding: "10px",
                        }}
                      >
                        <p className="fw-bold" style={{fontSize: "24px"}}>
                          Category:
                        </p>
                        <div className="ml-5">
                          <img
                            src={hotel?.hotel?.category?.image}
                            alt={hotel?.hotel?.category?.name}
                            style={{
                              height: "50px",
                              width: "50px",
                              borderRadius: "50px",
                            }}
                          />
                          <p className="fw-bold">
                            {hotel?.hotel?.category?.name}
                          </p>
                        </div>
                      </div>
                      <div
                        className="my-3"
                        style={{
                          border: "1px solid gray",
                          width: "300px",
                          borderRadius: "20px",
                          padding: "10px",
                        }}
                      >
                        <p className="fw-bold" style={{fontSize: "24px"}}>
                          Owner:{" "}
                        </p>
                        <div>
                          <img
                            src={hotel?.hotel?.owner?.image}
                            alt={hotel?.hotel?.owner?.email}
                            style={{
                              height: "50px",
                              width: "50px",
                              borderRadius: "50px",
                            }}
                          />
                        </div>
                        <p className="mt-3">
                          <span className="fw-bold">Email: </span>{" "}
                          {hotel?.hotel?.owner?.email}
                        </p>
                        <p>
                          <span className="fw-bold">Username: </span>{" "}
                          {hotel?.hotel?.owner?.username}
                        </p>
                        <p>
                          <span className="fw-bold">Mobile Number: </span>{" "}
                          {hotel?.hotel?.owner?.mobileNumber}
                        </p>
                      </div>
                      {hotel?.hotel?.verified ? (
                        <Badge bg="success" className="my-3 p-3 fs-5">
                          Verified by Admin
                        </Badge>
                      ) : (
                        <Badge bg="danger" className="my-3 p-3 fs-5">
                          Not Verified
                        </Badge>
                      )}
                      <Card.Text
                        style={{fontSize: "24px", textTransform: "capitalize"}}
                        className="mb-3"
                      >
                        <span className="fw-bold">Content: </span>
                        {hotel?.hotel?.content}
                      </Card.Text>
                      <Card.Text
                        style={{fontSize: "24px", textTransform: "capitalize"}}
                        className="mb-3"
                      >
                        <span className="fw-bold">Description: </span>
                        {hotel?.hotel?.description}
                      </Card.Text>
                      <Card.Text
                        style={{fontSize: "24px", textTransform: "capitalize"}}
                        className="mb-3"
                      >
                        <span className="fw-bold">Price: </span>
                        {hotel?.hotel?.price}
                      </Card.Text>
                      <Card.Text
                        style={{fontSize: "24px", textTransform: "capitalize"}}
                        className="mb-3"
                      >
                        <span className="fw-bold">Address: </span>
                        {hotel?.hotel?.address}
                      </Card.Text>
                      <Card.Text
                        style={{fontSize: "24px", textTransform: "capitalize"}}
                        className="mb-3"
                      >
                        <span className="fw-bold">Zip: </span>
                        {hotel?.hotel?.zip}
                      </Card.Text>
                      <Card.Text
                        style={{fontSize: "24px", textTransform: "capitalize"}}
                        className="mb-3"
                      >
                        <span className="fw-bold">City: </span>
                        {hotel?.hotel?.city}
                      </Card.Text>
                      <Card.Text
                        style={{fontSize: "24px", textTransform: "capitalize"}}
                        className="mb-3"
                      >
                        <span className="fw-bold">State: </span>
                        {hotel?.hotel?.state}
                      </Card.Text>
                      <Card.Text
                        style={{fontSize: "24px", textTransform: "capitalize"}}
                        className="mb-3"
                      >
                        <span className="fw-bold">Country: </span>
                        {hotel?.hotel?.country}
                      </Card.Text>
                      <Card.Text
                        style={{fontSize: "24px", textTransform: "capitalize"}}
                        className="mb-3"
                      >
                        <span className="fw-bold">Latitude: </span>
                        {hotel?.hotel?.latitude}
                      </Card.Text>
                      <Card.Text
                        style={{fontSize: "24px", textTransform: "capitalize"}}
                        className="mb-3"
                      >
                        <span className="fw-bold">Longitude: </span>
                        {hotel?.hotel?.longitude}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        {/* add order */}
        {/* add ratings */}
        <h2 className="fw-bold mt-5">Hotel Ratings</h2>
        <Row xl={4} lg={3} sm={2}>
          {hotel?.rating?.length === 0 ? (
            <Col>
              <h2 className="fw-bold text-center">
                This hotel have not any rating yet.
              </h2>
            </Col>
          ) : (
            <>
              {hotel?.rating?.map((rating) => (
                <Col key={rating._id} className="my-3">
                  <Card style={{width: "18rem"}}>
                    <Card.Img variant="top" src={rating.user.image} />
                    <Card.Body>
                      <Card.Text className="mb-2" style={{fontSize: "18px"}}>
                        <span className="fw-bold">Username: </span>
                        {rating.user.username}
                      </Card.Text>
                      <Card.Text className="mb-2" style={{fontSize: "18px"}}>
                        <span className="fw-bold">Email: </span>
                        {rating.user.email}
                      </Card.Text>
                      <Card.Text className="mb-2" style={{fontSize: "18px"}}>
                        <span className="fw-bold">Comment: </span>
                        {rating.comment}
                      </Card.Text>
                      <Card.Text className="mb-2" style={{fontSize: "18px"}}>
                        <span className="fw-bold">Rating: </span>
                        {rating.rating}
                      </Card.Text>
                      <Card.Text className="mb-2" style={{fontSize: "18px"}}>
                        <span className="fw-bold">Created At: </span>
                        {rating.createdAt}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Hotel;
