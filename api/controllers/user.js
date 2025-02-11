const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models");

const jwt_secret = process.env.JWT_SECRET;

// sign up
exports.signup = async (req, res, next) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  // hashing password
  try {
    newUser.password = await bcrypt.hash(newUser.password, 10);
  } catch (error) {
    res.status(500).json({ error: "Error hashing password", details: error });
  }

  // creating the user
  try {
    const user = await User.create(newUser);
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating user", details: error.message });
  }
};

// sign in
exports.signin = async (req, res, next) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // check if user exists
  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      jwt_secret,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful",
      id: user.id,
      name: user.name,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};
