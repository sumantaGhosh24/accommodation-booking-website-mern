const express = require("express");

const userCtrl = require("../controllers/userCtrl");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/users", verifyJWT, userCtrl.getAllUsers);

router.get("/user/:id", verifyJWT, userCtrl.getSingleUser);

router.put("/user/:id", verifyJWT, userCtrl.updateUser);

router.delete("/user/:id", verifyJWT, userCtrl.deleteUser);

module.exports = router;
