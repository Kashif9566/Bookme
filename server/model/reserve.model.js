const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Property = require("./property.model");
const Reserve = sequelize.define(
  "Reserve",
  {
    checkIn: {
      type: DataTypes.DATE,
    },
    checkOut: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Reserve;
