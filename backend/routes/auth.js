// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { encrypt, decrypt } = require("../utils/crypto"); // optional (leave commented if unused)
const router = express.Router();

/**
 * Minimal auth middleware (Authorization: Bearer <token>)
 * Keeps middleware here for simplicity. Move to middlewares/authMiddleware.js if you prefer.
 */
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) return res.status(401).json({ message: "Unauthorized: token missing" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // payload should contain { userId: ... }
    return next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }
}

/**
 * Helper: normalize email for consistent comparisons (optional)
 * If you store encrypted emails, do NOT use this and adapt accordingly.
 */
function normalizeEmail(email) {
  if (!email) return email;
  return String(email).trim().toLowerCase();
}

// --- Signup ---
router.post("/signup", async (req, res) => {
  try {
    const { name = "", email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const normalized = normalizeEmail(email);

    // Check if user exists (case-insensitive)
    const existing = await User.findOne({ email: normalized });
    if (existing) return res.status(409).json({ message: "User already exists" });

    // Hash password
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    // Optionally encrypt email before saving (if you want reversible)
    // const encEmail = encrypt(normalized);
    // const user = new User({ name, email: encEmail, password: hashed });

    const user = new User({ name, email: normalized, password: hashed });
    await user.save();

    // create token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    res.status(201).json({ message: "User created", token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Login ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const normalized = normalizeEmail(email);

    // If you encrypted email in DB, decrypt/compare accordingly.
    const user = await User.findOne({ email: normalized });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Protected: GET /me ---
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user && req.user.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Exclude password
    const user = await User.findById(userId).select("name email createdAt");
    if (!user) return res.status(404).json({ message: "User not found" });

    // If you stored encrypted email: decrypt before returning
    // const plainEmail = decrypt(user.email);
    // return res.json({ user: { _id: user._id, name: user.name, email: plainEmail, createdAt: user.createdAt } });

    return res.json({ user });
  } catch (err) {
    console.error("GET /me error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
