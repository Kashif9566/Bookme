const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Review = sequelize.define(
  "Review",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Review;
