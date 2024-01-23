const express = require("express");
const router = express.Router();
const user = require("../controller/user.controller");
const upload = require("../middleware/multerMiddleware");

router.post("/register", upload.single("image"), user.createUser);
router.post("/login", user.login);
router.put("/:userId/changePassword", user.changePassword);
router.put("/:userId/editProfile", upload.single("image"), user.updateUser);
router.put("/:userId/image", upload.single("image"), user.updateImage);
router.get("/:userId", user.getUserById);

module.exports = router;
