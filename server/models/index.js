const Products = require("./Products");
const Reviews = require("./Reviews");

Products.hasMany(Reviews, {
  foreignKey: "productId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Reviews.belongsTo(Products, {
  foreignKey: "productId",
});

module.exports = {
  Products,
  Reviews,
};
