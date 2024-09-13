const Products = require("../models/Products");
const Reviews = require("../models/Reviews");
const BaseControllers = require("../utils/baseControllers");
const catchAsync = require("../utils/catchAsync");

class ProductControllers extends BaseControllers {
  constructor() {
    super(Products, [Reviews]);
  }

  getAll = catchAsync(async (req, res, next) => {
    const products = await Products.findAll({
      include: [{ model: Reviews }],
    });

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  });
}

module.exports = new ProductControllers();
