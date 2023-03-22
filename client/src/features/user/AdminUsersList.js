import React from "react";
import {Badge, Col, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

import useTitle from "../../hooks/useTitle";
import {useGetAllUserQuery} from "./usersApiSlice";

const AdminUsersList = () => {
  useTitle("Users");

  const {data: users, isLoading} = useGetAllUserQuery();

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
            {users?.length === 0 ? (
              <h2 className="text-center fw-bold mt-5">
                you have not any users yet.
              </h2>
            ) : (
              <Container className="my-5">
                <h2 className="mb-4 fw-bold">All Users</h2>
                <Row>
                  <Col>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Mobile Number</th>
                          <th>DOB</th>
                          <th>Gender</th>
                          <th>Image</th>
                          <th>Zip</th>
                          <th>City</th>
                          <th>State</th>
                          <th>Country</th>
                          <th>Address Line 1</th>
                          <th>Address Line 2</th>
                          <th>Active</th>
                          <th>Role</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.map((user) => (
                          <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.mobileNumber}</td>
                            <td>{user.dob}</td>
                            <td>{user.gender}</td>
                            <td>
                              <img
                                src={user.image}
                                alt={user.username}
                                style={{
                                  height: "50px",
                                  width: "50px",
                                  borderRadius: "50px",
                                }}
                              />
                            </td>
                            <td>{user.zip}</td>
                            <td>{user.city}</td>
                            <td>{user.state}</td>
                            <td>{user.country}</td>
                            <td>{user.addressline1}</td>
                            <td>{user.addressline2}</td>
                            <td>
                              {user.active === "active" ? (
                                <Badge bg="success">Active</Badge>
                              ) : (
                                <Badge bg="danger">Inactive</Badge>
                              )}
                            </td>
                            <td>{user.role}</td>
                            <td>{user.createdAt}</td>
                            <td>{user.updatedAt}</td>
                            <td>
                              <Link
                                className="btn btn-primary"
                                to={`/admin-users/${user._id}`}
                              >
                                Manage User
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

export default AdminUsersList;
