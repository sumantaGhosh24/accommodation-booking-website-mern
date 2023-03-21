import jwtDecode from "jwt-decode";
import React from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import CircleLoader from "react-spinners/CircleLoader";
import {Link} from "react-router-dom";

import useTitle from "../../hooks/useTitle";
import {selectCurrentToken} from "../auth/authSlice";
import {useGetUserRatingsQuery} from "./ratingApiSlice";

const Ratings = () => {
  useTitle("Ratings");

  const token = useSelector(selectCurrentToken);
  const decoded = jwtDecode(token);
  const {id} = decoded.UserInfo;

  const {data: ratings, isLoading} = useGetUserRatingsQuery(id);

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col>
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
            {ratings?.ratings?.length === 0 ? (
              <h2 className="text-center fw-bold mt-5">
                You have not any ratings yet.
              </h2>
            ) : (
              <Container className="my-5">
                <h2 className="mb-4 fw-bold">My Ratings</h2>
                <Row>
                  <Col>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Comment</th>
                          <th>Rating</th>
                          <th>Hotel</th>
                          <th>Created At</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ratings?.ratings.map((rating) => (
                          <tr key={rating._id}>
                            <td>{rating._id}</td>
                            <td>{rating.comment}</td>
                            <td>{rating.rating}</td>
                            <td>
                              {rating.hotel.title}{" "}
                              <Link to={`/hotels/${rating.hotel._id}`}>
                                visit hotel
                              </Link>
                            </td>
                            <td>{rating.createdAt}</td>
                            <td>
                              <Link
                                className="btn btn-primary"
                                to={`/ratings/${rating._id}`}
                              >
                                Manage Rating
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Container>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Ratings;
