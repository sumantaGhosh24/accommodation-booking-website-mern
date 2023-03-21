const express = require("express");

const hotelCtrl = require("../controllers/hotelCtrl");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/hotels", hotelCtrl.getHotels);

router.get("/hotel/:id", hotelCtrl.getHotel);

// incomplete
router.post("/hotel", verifyJWT, hotelCtrl.createHotel);

router
  .route("/hotel/:id")
  .put(verifyJWT, hotelCtrl.updateHotel)
  .delete(verifyJWT, hotelCtrl.deleteHotel);

module.exports = router;
