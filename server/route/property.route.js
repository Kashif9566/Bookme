const express = require("express");
const router = express.Router();
const property = require("../controller/property.controller");
const upload = require("../config/multer.config");
const { protect } = require("../middleware/authMiddleware");

router.post(
  "/user/:userId/property",
  upload.single("image"),
  protect,
  property.createProperty
);
router.get("/allProperties", property.getProperties);
router.get("/user/:userId/property", property.getPropertiesForUser);
router.get("/property/:propertyId", property.getPropertyById);
router.delete("/user/:userId/property/:propertyId", property.deleteProperty);
router.get("/search", property.searchProperty);
router.put("/property/:propertyId", property.editProperty);

module.exports = router;
