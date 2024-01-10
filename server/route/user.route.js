const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const user = require("../controller/user.controller");
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
router.post("/register", upload.single("image"), user.createUser);
router.post("/login", user.login);

module.exports = router;
