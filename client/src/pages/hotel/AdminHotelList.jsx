import {Col, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

import {useTitle} from "../../hooks";
import {useGetHotelsQuery} from "../../app/features/hotel/hotelApiSlice";
import {Loading, ManageHotel} from "../../components";

const AdminHotelList = () => {
  useTitle("Manage Hotel");

  const {
    data: hotel,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHotelsQuery("hotelList", {
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
      <h3 className="text-center text-danger text-capitalize fw-bold mb-3">
        {error.message}
      </h3>
    );
  }

  if (isSuccess) {
    const {ids} = hotel;
    const tableContent =
      ids?.length &&
      ids.map((hotelId, i) => (
        <ManageHotel key={hotelId} hotelId={hotelId} ind={i + 1} />
      ));

    content = (
      <Row>
        <Col>
          <Container className="my-5">
            <h2 className="mb-4 fw-bold">All Hotels</h2>
            <Row>
              <Col>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>No.</th>
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
                  <tbody>{tableContent}</tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Container className="my-5">
        <Link to="/admin-hotel/new" className="btn btn-primary btn-lg">
          New Hotel
        </Link>
        {content}
      </Container>
    </>
  );
};

export default AdminHotelList;
