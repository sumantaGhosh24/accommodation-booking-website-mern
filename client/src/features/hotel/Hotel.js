import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

import {useGetHotelQuery} from "./hotelApiSlice";

const Hotel = () => {
  const {id} = useParams();

  const {data: hotel, isLoading} = useGetHotelQuery(id);

  console.log(hotel);

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
              // hotel details
              <Row>
                <Col sx={{span: 8, offset: 2}}>
                  <Card>
                    {/* <Card.Img variant="top" src={hotel.images[0]} /> */}
                    <Card.Body>
                      {/* <Card.Text>{hotel.title}</Card.Text> */}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        {/* add order */}
        {/* add ratings */}
        {/* ratings */}
      </Container>
    </>
  );
};

export default Hotel;
