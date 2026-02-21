const mongoose = require('mongoose');

// Simple User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String, // Full Name
  email: String,
  password: { type: String, required: true },
  avatar: String, // Cloudinary URL
  bio: String,   // User Bio
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);