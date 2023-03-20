import {Container, Row, ToastContainer} from "react-bootstrap";
import CircleLoader from "react-spinners/CircleLoader";
import {toast} from "react-toastify";
import {HotelCard, PublicHeader} from "../../components";
import useTitle from "../../hooks/useTitle";
import {useGetHotelsQuery} from "../hotel/hotelApiSlice";

const Welcome = () => {
  useTitle(`Welcome`);

  const {data: hotels, isFetching, isLoading, isError} = useGetHotelsQuery();

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
      <ToastContainer />
      {hotels.hotels.length === 0 && (
        <h2 className="text-center fw-bold mt-5">Hotel not found!</h2>
      )}
      <Container className="my-5">
        <Row xs={1} md={2} lg={3} className="g-4">
          {hotels.hotels.map((hotel) => (
            <HotelCard hotel={hotel} key={hotel._id} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Welcome;
