const express = require("express");

const ratingCtrl = require("../controllers/ratingCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.get("/all-ratings", authAdmin, ratingCtrl.getAllRatings);

router.get("/ratings/:hotel", auth, ratingCtrl.getRatings);

router.get("/ratings", auth, ratingCtrl.getMyRatings);

router.post("/rating/:hotel", auth, ratingCtrl.createRating);

module.exports = router;
