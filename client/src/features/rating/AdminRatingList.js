import React from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

import useTitle from "../../hooks/useTitle";
import {useGetAllRatingsQuery} from "./ratingApiSlice";

const AdminRatingList = () => {
  useTitle("Ratings");

  const {data: ratings, isLoading} = useGetAllRatingsQuery();

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
            {ratings?.length === 0 ? (
              <h2 className="text-center fw-bold mt-5">
                Any hotel not have any ratings yet.
              </h2>
            ) : (
              <Container className="my-5">
                <h2 className="mb-4 fw-bold">All Ratings</h2>
                <Row>
                  <Col>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Comment</th>
                          <th>Rating</th>
                          <th>Hotel</th>
                          <th>User</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ratings?.map((rating) => (
                          <tr key={rating._id}>
                            <td>{rating._id}</td>
                            <td>{rating.comment}</td>
                            <td>{rating.rating}</td>
                            <td>
                              {rating?.hotel?.title}
                              <Link to={`/admin-hotel/${rating?.hotel?._id}`}>
                                visit hotel
                              </Link>
                            </td>
                            <td>
                              {rating?.user?.email} || {rating?.user?.username}
                            </td>
                            <td>{rating.createdAt}</td>
                            <td>{rating.updatedAt}</td>
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

export default AdminRatingList;
