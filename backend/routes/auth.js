
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { encrypt, decrypt } = require("../utils/crypto"); // optional
const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name = "", email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "User already exists" });

    // hash password
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    // Optionally encrypt email before saving (if you want reversible)
    // const encEmail = encrypt(email);
    // const user = new User({ name, email: encEmail, password: hashed });

    const user = new User({ name, email, password: hashed });
    await user.save();

    // create token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

    res.status(201).json({ message: "User created", token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    // If you encrypted email in DB, decrypt/compare accordingly.
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
