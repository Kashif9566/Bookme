const express = require("express");
const router = express.Router();
const user = require("../controller/user.controller");
const upload = require("../middleware/multerMiddleware");

router.post("/register", upload.single("image"), user.createUser);
router.post("/login", user.login);
router.put("/:userId/changePassword", user.changePassword);
router.put("/:userId/editProfile", user.updateUser);
router.put("/users/:userId/image", upload.single("image"), user.updateImage);

module.exports = router;
