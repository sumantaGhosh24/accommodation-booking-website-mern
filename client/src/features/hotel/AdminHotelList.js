import React from "react";
import {Badge, Col, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

import useTitle from "../../hooks/useTitle";
import {useGetAllHotelsQuery} from "./hotelApiSlice";

const AdminHotelList = () => {
  useTitle("Hotels");

  const {data: hotels, isLoading} = useGetAllHotelsQuery();

  return (
    <>
      <Container className="my-5">
        <Link to="/admin-hotel/new" className="btn btn-primary btn-lg">
          New Hotel
        </Link>
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
            {hotels?.hotels?.length === 0 ? (
              <h2 className="text-center fw-bold mt-5">
                You have not any users yet.
              </h2>
            ) : (
              <Container className="my-5">
                <h2 className="mb-4 fw-bold">All Hotels</h2>
                <Row>
                  <Col>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Content</th>
                          <th>Images</th>
                          <th>Price</th>
                          <th>City</th>
                          <th>State</th>
                          <th>Country</th>
                          <th>Zip</th>
                          <th>Address</th>
                          <th>Latitude</th>
                          <th>Longitude</th>
                          <th>Category</th>
                          <th>Owner</th>
                          <th>Verified</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hotels?.hotels?.map((hotel) => (
                          <tr key={hotel._id}>
                            <td>{hotel._id}</td>
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
                              <Link
                                className="btn btn-primary"
                                to={`/admin-hotel/${hotel._id}`}
                              >
                                Manage Hotel
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

export default AdminHotelList;

function getWordStr(str, len) {
  return str.split(/\s+/).slice(0, len).join(" ");
}
