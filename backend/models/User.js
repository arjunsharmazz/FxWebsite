// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  // We will optionally store encryptedEmail if you use encryption util.
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed with bcrypt
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
