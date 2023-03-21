const express = require("express");

const bookingCtrl = require("../controllers/bookingCtrl");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/booking", verifyJWT, bookingCtrl.getUserBooking);

router
  .route("/booking/:id")
  .get(verifyJWT, bookingCtrl.getBooking)
  .put(verifyJWT, bookingCtrl.updateBooking)
  .delete(verifyJWT, bookingCtrl.deleteBooking);

// incomplete
router.get("/bookings", verifyJWT, bookingCtrl.getBookings);

router.post("/booking", verifyJWT, bookingCtrl.createBooking);

router.get("/hotel-booking/:hotel", verifyJWT, bookingCtrl.getHotelBooking);

module.exports = router;
