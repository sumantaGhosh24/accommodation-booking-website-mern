import {Col, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

import {useTitle} from "../../hooks";
import {useGetCategoriesQuery} from "../../app/features/category/categoryApiSlice";
import {Loading, ManageCategory} from "../../components";

const AdminCategoryList = () => {
  useTitle("Manage Category");

  const {
    data: category,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery("categoryList", {
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
    const {ids} = category;
    const tableContent =
      ids?.length &&
      ids.map((catId, i) => (
        <ManageCategory key={catId} catId={catId} ind={i + 1} />
      ));

    content = (
      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>No.</th>
                <th>Id</th>
                <th>Name</th>
                <th>Image</th>
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
              <h2 className="mb-4 fw-bold">All Category</h2>
              <Link className="btn btn-primary mb-5" to="/admin-category/new">
                Create Category
              </Link>
              {content}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminCategoryList;
