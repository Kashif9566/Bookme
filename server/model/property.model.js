const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");

const Property = sequelize.define(
  "Property",
  {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    town: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tagLine: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 5000],
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bathroom: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = Property;
