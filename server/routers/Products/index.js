const express = require("express");
const router = express.Router();

const productRouters = require("./ProductRouters");
const reviewRouters = require("./ReviewRouters");

router.use("/reviews", reviewRouters);
router.use("/products", productRouters); // Fixed the route to be "/products"

module.exports = router;
