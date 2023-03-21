const express = require("express");

const {
  login,
  logout,
  refresh_token,
  register,
} = require("../controllers/authCtr");
const loginLimiter = require("../middleware/loginLimiter");

const router = express.Router();

router.post("/register", register);

router.post("/login", loginLimiter, login);

router.get("/refresh_token", refresh_token);

router.post("/logout", logout);

module.exports = router;
