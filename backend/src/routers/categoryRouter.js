const express = require("express");

const categoryCtrl = require("../controllers/categoryCtrl");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router
  .route("/category")
  .get(categoryCtrl.getCategories)
  .post(verifyJWT, categoryCtrl.createCategory);

router
  .route("/category/:id")
  .get(verifyJWT, categoryCtrl.getCategory)
  .delete(verifyJWT, categoryCtrl.deleteCategory)
  .put(verifyJWT, categoryCtrl.updateCategory);

module.exports = router;
