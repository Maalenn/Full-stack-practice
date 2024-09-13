const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Reviews = sequelize.define(
  "Reviews",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Reviews",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Rating is required!",
        },
        isNumeric: {
          msg: "Rating must contain only numbers.",
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
  },
  {
    timestamps: true,
  }
);

module.exports = Reviews;
