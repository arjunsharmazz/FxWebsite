// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

// API routes
app.use("/api/auth", authRoutes);

// example protected route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.get("/", (req, res) => res.send("PayKuberFX backend running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
