const express = require("express");

const paymentCtrl = require("../controllers/paymentCtrl");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.use(verifyJWT);

router.get("/logo.svg", paymentCtrl.logo);

router.post("/verification", paymentCtrl.verification);

router.post("/razorpay", paymentCtrl.razor);

module.exports = router;
