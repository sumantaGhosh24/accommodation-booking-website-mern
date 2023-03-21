import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import CircleLoader from "react-spinners/CircleLoader";
import {toast} from "react-toastify";
import {HotelCard} from "../../components";

import {useGetHotelsSearchQuery} from "./hotelApiSlice";

const SearchHotel = () => {
  const [que, setQue] = useState({
    search: "porro",
    sort: "-price",
    limit: 25,
  });
  const [text, setText] = useState("porro");

  const handleChange = (e) => {
    const {name, value} = e.target;
    setQue({...que, [name]: value});
    if (name === "search") {
      setText(e.target.value);
    }
  };

  const {
    data: hotels,
    isFetching,
    isLoading,
    isError,
  } = useGetHotelsSearchQuery(que);

  if (isLoading || isFetching) {
    return (
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
    );
  }

  if (isError) {
    toast.error("something went wrong, please try again later", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 7000,
      pauseOnFocusLoss: true,
      toastId: "hotels-error",
      delay: 300,
    });
  }

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col
            md={{span: 10, offset: 1}}
            style={{background: "#eee"}}
            className="p-5 rounded mb-4"
          >
            <h2 className="mb-4 fw-bold">Search your Destination</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Search Query</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your search query"
                  size="lg"
                  name="search"
                  onChange={handleChange}
                  value={que.search}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sort Pricing</Form.Label>
                <Form.Select
                  name="sort"
                  size="lg"
                  onChange={handleChange}
                  value={que.sort}
                >
                  <option>sort according to price</option>
                  <option value="-price">High to low price</option>
                  <option value="price">Low to high price</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {text && (
          <p style={{fontSize: "24px"}} className="mb-4 fw-bold">
            search result based on <span className="text-primary">{text}</span>
          </p>
        )}
        {hotels.hotels.length === 0 || text === "" ? (
          <h2 className="text-center fw-bold mt-5">
            Please search a valid query, to get your suitable accommodation.
          </h2>
        ) : (
          <Row sx={1} md={2} lg={3} className="g-4">
            {hotels.hotels.map((hotel) => (
              <HotelCard hotel={hotel} key={hotel._id} />
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default SearchHotel;
