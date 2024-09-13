const express = require("express");
const router = express.Router();
const productControllers = require("../../controllers/productControllers");

router
  .route("/")
  .get(productControllers.getAll)
  .post(productControllers.createOne);

router
  .route("/:id")
  .get(productControllers.getOne)
  .patch(productControllers.updateOne)
  .delete(productControllers.deleteOne);

module.exports = router;
