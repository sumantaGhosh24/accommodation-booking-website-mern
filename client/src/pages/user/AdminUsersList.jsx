import {Col, Container, Row, Table} from "react-bootstrap";

import {useTitle} from "../../hooks";
import {useGetAllUserQuery} from "../../app/features/user/usersApiSlice";
import {Loading, ManageUser} from "../../components";

const AdminUsersList = () => {
  useTitle("Manage User");

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllUserQuery("userList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  let content;

  if (isError) {
    content = (
      <h3 className="text-center text-danger fw-bold text-capitalize mb-3">
        {error.message}
      </h3>
    );
  }

  if (isSuccess) {
    const {ids} = user;
    const tableContent =
      ids?.length &&
      ids.map((userId, i) => (
        <ManageUser key={userId} userId={userId} ind={i + 1} />
      ));

    content = (
      <Row>
        <Col style={{overflowX: "scroll"}}>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>No.</th>
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
            <tbody>{tableContent}</tbody>
          </Table>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col>
            <Container className="my-5">
              <h2 className="mb-4 fw-bold">All Users</h2>
              {content}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminUsersList;
