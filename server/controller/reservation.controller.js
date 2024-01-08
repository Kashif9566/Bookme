const Reserve = require("../model/reserve.model");
const Property = require("../model/property.model");
const User = require("../model/user.model");
const { where } = require("sequelize");

exports.createReservation = async (req, res) => {
  const { checkIn, checkOut, userId, propertyId } = req.body;

  try {
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const reservation = await Reserve.create({
      UserId: userId,
      PropertyId: propertyId,
      checkIn,
      checkOut,
    });

    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getReservationsForProperty = async (req, res) => {
  const propertyId = req.params.propertyId;
  try {
    const reservations = await Reserve.findAll({
      where: { PropertyId: propertyId },
      include: [
        {
          model: User,
          attributes: ["id", "username", "email", "image"],
        },
      ],
    });
    res.status(201).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getReservationsForHost = async (req, res) => {
  const userId = req.params.hostId;
  try {
    const reservations = await Reserve.findAll({
      include: [
        {
          model: Property,
          where: { UserId: userId },
          attributes: ["id", "title", "city", "province", "image"],
        },
        {
          model: User,
          attributes: ["id", "username", "email", "image"],
        },
      ],
    });

    res.status(201).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
