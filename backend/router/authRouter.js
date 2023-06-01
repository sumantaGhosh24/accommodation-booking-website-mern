const express = require("express");

const authCtrl = require("../controllers/authCtrl");
const loginLimiter = require("../middleware/loginLimiter");

const router = express.Router();

router.post("/register", authCtrl.register);

router.post("/login", loginLimiter, authCtrl.login);

router.get("/refresh_token", authCtrl.refresh_token);

router.post("/logout", authCtrl.logout);

module.exports = router;
