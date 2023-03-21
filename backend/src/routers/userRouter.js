const express = require("express");

const userCtrl = require("../controllers/userCtrl");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/user/:id", verifyJWT, userCtrl.getSingleUser);

// incomplete
router
  .route("user/:id")
  .patch(verifyJWT, userCtrl.updateUser)
  .delete(verifyJWT, userCtrl.deleteUser);

module.exports = router;
