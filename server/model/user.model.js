const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "host", "user"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
