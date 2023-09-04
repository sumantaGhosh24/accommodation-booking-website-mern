import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

import {useTitle} from "../../hooks";
import {useGetDashboardQuery} from "../../app/features/user/usersApiSlice";
import {Loading} from "../../components";

const Dashboard = () => {
  useTitle(`Dashboard`);

  const {data, isLoading} = useGetDashboardQuery();

  return (
    <>
      {isLoading && <Loading />}
      <Container className="my-5">
        <Row lg={3} md={2} sm={1} className="g-4">
          <Col>
            <Card style={{width: "18rem"}}>
              <Card.Body>
                <Card.Title>Total Number Booking</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {data?.bookingCount}
                </Card.Subtitle>
                <Link to="/admin-booking">Read More</Link>
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
                <Link to="/admin-category">Read More</Link>
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
                <Link to="/admin-hotel">Read More</Link>
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
                <Link to="/admin-rating">Read More</Link>
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
                <Link to="/admin-users">Read More</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
