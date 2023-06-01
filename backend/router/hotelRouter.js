const express = require("express");

const hotelCtrl = require("../controllers/hotelCtrl");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.get("/p-hotels", hotelCtrl.getPaginationHotels);

router.get("/hotels", hotelCtrl.getHotels);

router.post("/hotel", authAdmin, hotelCtrl.createHotel);

router.put("/hotel", authAdmin, hotelCtrl.updateHotel);

router.delete("/hotel/:id", authAdmin, hotelCtrl.deleteHotel);

module.exports = router;
