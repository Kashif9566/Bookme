const Property = require("../model/property.model");
const User = require("../model/user.model");
const Review = require("../model/review.model");
const { Op } = require("sequelize");
const cloudinary = require("../config/cloudinary.config");
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
    discount,
  } = req.body;

  const image = req.file ? req.file.path : null;
  const userId = req.params.userId;

  try {
    if (!title || !description || !price) {
      console.error("Validation Error:", { title, description, price });
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    let imageUrl = null;

    if (image) {
      try {
        const result = await uploadToCloudinary(image);
        imageUrl = result.secure_url;
      } catch (cloudinaryError) {
        console.error(cloudinaryError);
        return res.status(500).json({
          success: false,
          message: "Error uploading image to Cloudinary",
        });
      }
    }
    const youEarn = parseFloat(price);
    const discountPercentage = parseFloat(discount) || 0;
    const discountAmount = (discountPercentage / 100) * youEarn;
    const discountedPrice =
      discountPercentage === 0 ? youEarn : youEarn - discountAmount;

    const newProperty = await Property.create({
      address,
      city,
      town,
      title,
      description,
      tagLine,
      price: youEarn,
      rooms,
      bed,
      bathroom,
      discount,
      discountedPrice,
      image: imageUrl,
      province,
      UserId: userId,
    });

    const propertyWithDetails = await Property.findByPk(newProperty.id, {
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
        },
        {
          model: Review,
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
        {
          model: Review,
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
        {
          model: Review,
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

exports.editProperty = async (req, res) => {
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
    discount,
    province,
  } = req.body;

  const propertyId = req.params.propertyId;

  try {
    if (!title || !description || !price) {
      console.error("Validation Error:", { title, description, price });
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    let imageUrl = null;

    // Check if a new image is provided
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.path);
        imageUrl = result.secure_url;
      } catch (cloudinaryError) {
        console.error(cloudinaryError);
        return res.status(500).json({
          success: false,
          message: "Error uploading image to Cloudinary",
        });
      }
    }

    // If no new image is provided, keep the previous image
    if (!imageUrl) {
      const existingProperty = await Property.findByPk(propertyId);
      imageUrl = existingProperty.image;
    }

    const youEarn = parseFloat(price);
    const discountPercentage = parseFloat(discount) || 0;
    const discountAmount = (discountPercentage / 100) * youEarn;
    const discountedPrice =
      discountPercentage === 0 ? youEarn : youEarn - discountAmount;

    const updatedProperty = await Property.update(
      {
        address,
        city,
        town,
        title,
        description,
        tagLine,
        price,
        rooms,
        bed,
        discount,
        discountedPrice,
        bathroom,
        image: imageUrl,
        province,
      },
      {
        where: { id: propertyId },
        returning: true,
      }
    );

    if (updatedProperty[0] === 0) {
      return res.status(404).json({ error: "Property not found" });
    }

    const updatedPropertyDetails = updatedProperty[1][0];
    const propertyWithDetails = await Property.findByPk(
      updatedPropertyDetails.id,
      {
        include: [
          {
            model: User,
            attributes: ["id", "username", "email"],
          },
          {
            model: Review,
          },
        ],
      }
    );

    res.status(200).json(propertyWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadToCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (err, result) => {
      if (err) {
        console.log(err);
        reject({
          success: false,
          message: "Error uploading image to Cloudinary",
        });
      } else {
        resolve(result);
      }
    });
  });
};
