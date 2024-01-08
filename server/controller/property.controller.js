const Property = require("../model/property.model");
const User = require("../model/user.model");
const { Op } = require("sequelize");
exports.createProperty = async (req, res) => {
  const {
    address,
    city,
    town,
    title,
    description,
    tagLine,
    price,
    rooms,
    bed,
    bathroom,
    province,
    country,
  } = req.body;

  const image = req.file ? req.file.path : null;
  const userId = req.params.userId;

  try {
    const newProperty = await Property.create({
      address,
      city,
      town,
      title,
      description,
      tagLine,
      price,
      rooms,
      bed,
      bathroom,
      image,
      province,
      country,
      UserId: userId,
    });

    const propertyWithDetails = await Property.findByPk(newProperty.id, {
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
        },
      ],
    });

    res.status(201).json(propertyWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
        },
      ],
    });
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPropertyById = async (req, res) => {
  const propertyId = req.params.propertyId;
  try {
    const property = await Property.findByPk(propertyId, {
      include: [
        {
          model: User,
          attributes: ["id", "username", "email", "image", "role"],
        },
      ],
    });
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteProperty = async (req, res) => {
  const propertyId = req.params.propertyId;
  try {
    const deletedProperty = await Property.destroy({
      where: { id: propertyId },
    });
    if (deletedProperty) {
      res.status(200).json({ message: "Property deleted successfully" });
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchProperty = async (req, res) => {
  const { query } = req.query;
  console.log("Search query:", query);

  try {
    const property = await Property.findAll({
      where: {
        [Op.or]: [
          {
            city: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            town: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            address: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            province: {
              [Op.iLike]: `%${query}%`,
            },
          },
        ],
      },
    });

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.editProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount] = await Property.update(req.body, {
      where: { id },
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ error: "Property not found" });
      return;
    }
    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating property" });
  }
};
exports.getPropertiesForUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const properties = await Property.findAll({
      where: {
        UserId: userId,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
