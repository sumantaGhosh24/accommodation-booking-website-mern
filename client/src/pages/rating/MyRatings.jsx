import {Col, Container, Row, Table} from "react-bootstrap";

import {useTitle} from "../../hooks";
import {useGetMyRatingsQuery} from "../../app/features/rating/ratingApiSlice";
import {Loading, ManageMyRating} from "../../components";

const MyRatings = () => {
  useTitle("My Ratings");

  const {
    data: ratings,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMyRatingsQuery("ratingList", {
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
    const {ids} = ratings;
    const tableContent =
      ids?.length &&
      ids.map((ratingId, i) => (
        <ManageMyRating key={ratingId} ratingId={ratingId} ind={i + 1} />
      ));

    content = (
      <Container className="my-5">
        <h2 className="mb-4 fw-bold">My Ratings</h2>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Id</th>
                  <th>Comment</th>
                  <th>Rating</th>
                  <th>Hotel</th>
                  <th>User</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>{tableContent}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col>{content}</Col>
        </Row>
      </Container>
    </>
  );
};

export default MyRatings;
