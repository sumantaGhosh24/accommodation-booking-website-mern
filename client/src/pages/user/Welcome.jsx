import {useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";

import {useTitle} from "../../hooks";
import {useGetPaginationHotelsQuery} from "../../app/features/hotel/hotelApiSlice";
import {Hotel, Loading} from "../../components";
import {useGetCategoriesQuery} from "../../app/features/category/categoryApiSlice";

const Welcome = () => {
  useTitle(`Welcome`);

  const [sCategory, setSCategory] = useState("");
  const [sSort, setSSort] = useState("");
  const [sSearch, setSSearch] = useState("");
  const [sPage, setSPage] = useState(1);

  const {
    data: hotels,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPaginationHotelsQuery({
    category: sCategory,
    sort: sSort,
    search: sSearch,
    page: sPage,
  });

  const {category} = useGetCategoriesQuery("categoryList", {
    selectFromResult: ({data}) => ({
      category: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!category?.length) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleCategory = (e) => {
    setSCategory(e.target.value);
    setSSearch("");
  };

  let content;

  if (isError) {
    content = (
      <h3 className="text-center text-danger fw-bold text-capitalize mb-3">
        {error.message}
      </h3>
    );
  }

  if (isSuccess) {
    const {ids} = hotels;
    const tableContent =
      ids?.length &&
      ids.map((hotelId) => <Hotel key={hotelId} hotelId={hotelId} />);

    content = (
      <Container className="my-5">
        <Row xs={1} md={2} lg={3} className="g-4">
          {tableContent}
        </Row>
      </Container>
    );
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#eee",
          minHeight: "25ph",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container style={{borderRadius: "50px"}}>
          <Row>
            <Col className="bg-white p-5 rounded my-5">
              <h2 className="text-center mb-5">Filter Hotels</h2>
              <Row>
                <Col>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginRight: "7px",
                    }}
                  >
                    Filters:{" "}
                  </span>
                  <select
                    name="category"
                    value={sCategory}
                    onChange={handleCategory}
                    className="p-2"
                  >
                    <option value="">All Products</option>
                    {category.map((category) => (
                      <option
                        value={"category=" + category._id}
                        key={category._id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginRight: "7px",
                    }}
                  >
                    Search:{" "}
                  </span>
                  <input
                    type="text"
                    value={sSearch}
                    placeholder="Enter your search!"
                    onChange={(e) => setSSearch(e.target.value.toLowerCase())}
                    className="p-2"
                  />
                </Col>
                <Col>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginRight: "7px",
                    }}
                  >
                    Sort By:{" "}
                  </span>
                  <select
                    value={sSort}
                    onChange={(e) => setSSort(e.target.value)}
                    className="p-2"
                  >
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-sold">Best sales</option>
                    <option value="sort=-price">Price: Hight-Low</option>
                    <option value="sort=price">Price: Low-Hight</option>
                  </select>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      {content}
      <div className="d-flex items-center justify-content-center my-5">
        <Button size="lg" onClick={() => setSPage(sPage + 1)}>
          Load More
        </Button>
      </div>
    </>
  );
};

export default Welcome;
