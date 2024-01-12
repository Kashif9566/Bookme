const express = require("express");
const router = express.Router();
const review = require("../controller/review.controller");
const { protect } = require("../middleware/authMiddleware");

router.post("/property/:propertyId", protect, review.createReview);
router.get("/reviews/property/:propertyId", review.getReviewsForProperty);
router.get("/review/:reviewId", review.getReviewById);
router.put("/review/:reviewId", protect, review.updateReview);
router.delete("/review/:reviewId", protect, review.deleteReview);

module.exports = router;
