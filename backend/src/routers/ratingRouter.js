const express = require("express");

const ratingCtrl = require("../controllers/ratingCtrl");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/ratings/:user", verifyJWT, ratingCtrl.getUserRatings);

router.get("/rating/:id", verifyJWT, ratingCtrl.getSingleRating);

router.put("/rating/:id", verifyJWT, ratingCtrl.updateRating);

router.delete("/rating/:id", verifyJWT, ratingCtrl.deleteRating);

// incomplete
router.get("/ratings/:hotel", verifyJWT, ratingCtrl.getRatings);

router.post("/rating/:hotel", verifyJWT, ratingCtrl.createRating);

module.exports = router;
