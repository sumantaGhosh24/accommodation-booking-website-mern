const express = require("express");

const paymentCtrl = require("../controllers/paymentCtrl");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.use(verifyJWT);

router.post("/orders", paymentCtrl.createOrder);

router.post("/success", paymentCtrl.paymentVerification);

module.exports = router;
