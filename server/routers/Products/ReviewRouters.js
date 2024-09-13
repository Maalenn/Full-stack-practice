const express = require("express");
const router = express.Router();
const reviewControllers = require("../../controllers/reviewControllers");

router
  .route("/")
  .get(reviewControllers.getAll)
  .post(reviewControllers.createOne);

router
  .route("/:id")
  .get(reviewControllers.getOne)
  .patch(reviewControllers.updateOne)
  .delete(reviewControllers.deleteOne);

module.exports = router;
