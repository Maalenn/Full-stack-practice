const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Products = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please provide a product name!",
        },
        len: {
          args: [2, 30],
          msg: "Product name must be between 2 and 30 characters long.",
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ensure price cannot be null
      validate: {
        notEmpty: {
          msg: "Price is required!",
        },
        isNumeric: {
          msg: "Price must contain only numbers.",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 255],
          msg: "Description cannot exceed 255 characters",
        },
      },
    },
    published: {
      // Fixed the typo here
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Optional: set a default value
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["title"],
      },
    ],
  }
);

module.exports = Products;
