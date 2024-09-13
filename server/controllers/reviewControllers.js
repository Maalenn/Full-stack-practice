const Reviews = require("../models/Reviews");
const BaseControllers = require("../utils/baseControllers");

const reviewControllers = new BaseControllers(Reviews);

module.exports = reviewControllers;
