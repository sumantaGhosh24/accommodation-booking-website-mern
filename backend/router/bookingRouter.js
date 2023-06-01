const express = require("express");

const bookingCtrl = require("../controllers/bookingCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.get("/booking", auth, bookingCtrl.getUserBooking);

router.put("/booking", authAdmin, bookingCtrl.updateBooking);

router.get("/bookings", authAdmin, bookingCtrl.getBookings);

router.get("/hotel-booking/:hotel", auth, bookingCtrl.getHotelBooking);

module.exports = router;
