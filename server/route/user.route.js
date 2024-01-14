const express = require("express");
const router = express.Router();
const user = require("../controller/user.controller");
const upload = require("../middleware/multerMiddleware");

router.post("/register", upload.single("image"), user.createUser);
router.post("/login", user.login);

module.exports = router;
