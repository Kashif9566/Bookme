const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt");
const cloudinary = require("../config/cloudinary.config");
const fs = require("fs");
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

exports.changePassword = async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({ error: "User has no password set" });
    }

    if (!currentPassword) {
      return res.status(400).json({ error: "Current password is missing" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update({ password: hashedPassword }, { where: { id: userId } });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use" });
      }
    }

    let imageUrl = user.image;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file);
      imageUrl = uploadResult.secure_url;
    }

    await User.update(
      { username, email, image: imageUrl },
      { where: { id: userId } }
    );

    res.status(200).json({
      id: userId,
      username,
      email,
      image: imageUrl,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateImage = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let imageUrl = null;

    if (req.file) {
      if (user.image) {
        const uploadResult = await uploadToCloudinary(req.file);
        imageUrl = uploadResult.secure_url;
        await User.update({ image: imageUrl }, { where: { id: userId } });
      } else {
        const uploadResult = await uploadToCloudinary(req.file);
        imageUrl = uploadResult.secure_url;
        await User.update({ image: imageUrl }, { where: { id: userId } });
      }
    } else {
      return res.status(400).json({ error: "Image file is missing" });
    }

    const updatedUser = await User.findByPk(userId);

    res.status(200).json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      image: updatedUser.image,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
