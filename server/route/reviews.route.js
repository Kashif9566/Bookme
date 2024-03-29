const express = require("express");
const router = express.Router();
const review = require("../controller/review.controller");

router.post("/property/:propertyId", review.createReview);
router.get("/reviews/property/:propertyId", review.getReviewsForProperty);
router.get("/review/:reviewId", review.getReviewById);
router.put("/review/:reviewId", review.updateReview);
router.delete("/user/:userId/review/:reviewId", review.deleteReview);

module.exports = router;
