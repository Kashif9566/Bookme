const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const property = require("../controller/property.controller");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
router.post(
  "/user/:userId/property",
  upload.single("image"),
  property.createProperty
);
router.get("/allProperties", property.getProperties);
router.get("/user/:userId/property", property.getPropertiesForUser);
router.get("/property/:propertyId", property.getPropertyById);
router.delete("/user/:userId/property/:propertyId", property.deleteProperty);
router.get("/search", property.searchProperty);
router.put("/property/:propertyId", property.editProperty);

module.exports = router;
