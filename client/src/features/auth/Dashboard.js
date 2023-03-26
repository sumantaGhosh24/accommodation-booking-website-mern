import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

import useTitle from "../../hooks/useTitle";
import {useGetDashboardQuery} from "../user/usersApiSlice";

const Dashboard = () => {
  useTitle(`Dashboard`);

  const {data, isLoading} = useGetDashboardQuery();

  return (
    <>
      {isLoading && (
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
      )}
      <Container className="my-5">
        <Row lg={3} md={2} sm={1} className="g-4">
          <Col>
            <Card style={{width: "18rem"}}>
              <Card.Body>
                <Card.Title>Total Number Booking</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {data?.bookingCount}
                </Card.Subtitle>
                <Link href="/admin-booking">Read More</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{width: "18rem"}}>
              <Card.Body>
                <Card.Title>Total Number Category</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {data?.categoryCount}
                </Card.Subtitle>
                <Link href="/admin-category">Read More</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{width: "18rem"}}>
              <Card.Body>
                <Card.Title>Total Number Hotel</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {data?.hotelCount}
                </Card.Subtitle>
                <Link href="/admin-hotel">Read More</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{width: "18rem"}}>
              <Card.Body>
                <Card.Title>Total Number Rating</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {data?.ratingCount}
                </Card.Subtitle>
                <Link href="/admin-rating">Read More</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{width: "18rem"}}>
              <Card.Body>
                <Card.Title>Total Number Users</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {data?.userCount}
                </Card.Subtitle>
                <Link href="/admin-users">Read More</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
