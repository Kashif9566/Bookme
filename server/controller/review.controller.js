const Property = require("../model/property.model");
const Review = require("../model/review.model");
const User = require("../model/user.model");

exports.createReview = async (req, res) => {
  const { content, rating, userId } = req.body;
  const propertyId = req.params.propertyId;

  try {
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const newReview = await Review.create({
      content,
      rating,
      PropertyId: propertyId,
      UserId: userId,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getReviewsForProperty = async (req, res) => {
  const propertyId = req.params.propertyId;

  try {
    const reviews = await Review.findAll({
      where: { PropertyId: propertyId },
      include: {
        model: User,
        attributes: ["id", "username", "email", "image"],
      },
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getReviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByPk(id);
    if (!review) {
      res.status(404).json({ error: "Review not found" });
      return;
    }
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { content, rating } = req.body;

  try {
    const [updatedRowsCount] = await Review.update(
      { content, rating },
      {
        where: { id },
      }
    );
    if (updatedRowsCount === 0) {
      res.status(404).json({ error: "Review not found" });
      return;
    }
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteReview = async (req, res) => {
  const id = req.params.reviewId;
  try {
    await Review.destroy({ where: { id } });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
