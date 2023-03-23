import React from "react";

const AdminBookingList = () => {
  // show all booking
  return (
    <>
      {/* <Container className="my-5">
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
                        </tr>
                      </thead>
                      <tbody>
                        {users?.map((user) => (
                          <tr key={user._id}>
                            <td>{user._id}</td>
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
      </Container> */}
    </>
  );
};

export default AdminBookingList;
