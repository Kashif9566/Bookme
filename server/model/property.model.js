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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    discountedPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
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
