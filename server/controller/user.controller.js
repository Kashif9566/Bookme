const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt");
const cloudinary = require("../config/cloudinary.config");

exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    if (!username || !email || !password) {
      console.error("Validation Error:", { username, email, password });
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    let imageUrl = null;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file);
      imageUrl = uploadResult.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
      image: imageUrl,
    });

    if (newUser) {
      return res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        image: imageUrl,
        role: newUser.role,
        token: generateToken(newUser.id),
      });
    } else {
      return res.status(500).json({ error: "Failed to create user" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (err, result) => {
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ error: "User does not exist" });
      return;
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
