import {Container, Row} from "react-bootstrap";

import {useGetHotelsQuery} from "../../app/features/hotel/hotelApiSlice";
import {useTitle} from "../../hooks";
import {Loading, PublicHeader, PublicHotel} from "../../components";

const Public = () => {
  useTitle("Public");

  const {
    data: hotels,
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
      <h3 className="text-center text-danger fw-bold text-capitalize mb-3">
        {error.message}
      </h3>
    );
  }

  if (isSuccess) {
    const {ids} = hotels;
    const tableContent =
      ids?.length &&
      ids.map((hotelId) => <PublicHotel key={hotelId} hotelId={hotelId} />);

    content = (
      <Container className="my-5">
        <Row xs={1} md={2} className="g-4">
          {tableContent}
        </Row>
      </Container>
    );
  }

  return (
    <>
      <PublicHeader />
      {content}
    </>
  );
};

export default Public;
