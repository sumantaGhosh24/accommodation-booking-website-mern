import React from "react";
import jwtDecode from "jwt-decode";
import {Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import CircleLoader from "react-spinners/CircleLoader";

import useTitle from "../../hooks/useTitle";
import {useGetUserQuery} from "../user/usersApiSlice";
import {selectCurrentToken} from "./authSlice";

const Profile = () => {
  useTitle("Profile");

  const token = useSelector(selectCurrentToken);
  const decoded = jwtDecode(token);
  const {id} = decoded.UserInfo;

  const {data: user, isLoading} = useGetUserQuery(id);

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
                  height: "fill-content",
                }}
              >
                <CircleLoader color="#0D6EFD" size={480} />
              </div>
            ) : (
              <section className="p-5 mb-5 shadow">
                <div className="container">
                  <div className="row align-items-center flex-row-reverse">
                    <div className="col-lg-6">
                      <h3 className="fw-bold fs-1 mb-3">My Profile</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              First Name
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.firstName}
                            </p>
                          </div>
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              Last Name
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.lastName}
                            </p>
                          </div>
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              Username
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.username}
                            </p>
                          </div>
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              Email
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.email}
                            </p>
                          </div>
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              Mobile
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.mobileNumber}
                            </p>
                          </div>
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              Gender
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.gender}
                            </p>
                          </div>
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              DOB
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.dob}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              User Since
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.createdAt}
                            </p>
                          </div>
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              City
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.city}
                            </p>
                          </div>
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              State
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.state}
                            </p>
                          </div>
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              Country
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.country}
                            </p>
                          </div>
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              Zip
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.zip}
                            </p>
                          </div>
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              Address Line 1
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.addressline1}
                            </p>
                          </div>
                          <div className="mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{fontSize: "18px"}}
                            >
                              Address Line 2
                            </p>
                            <p
                              style={{fontWeight: "500", fontSize: "16px"}}
                              className="text-capitalize"
                            >
                              {user.addressline2}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div>
                        <img
                          src={user.image}
                          alt={user.username}
                          className="img-fluid rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
