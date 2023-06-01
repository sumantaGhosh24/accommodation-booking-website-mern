const express = require("express");

const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.delete("/user/:id", authAdmin, userCtrl.deleteUser);

router.get("/users", authAdmin, userCtrl.getUsers);

router.get("/user", auth, userCtrl.getUser);

router.put("/user", auth, userCtrl.updateUser);

router.get("/dashboard", authAdmin, userCtrl.getDashboard);

module.exports = router;
