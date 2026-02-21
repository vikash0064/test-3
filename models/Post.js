const mongoose = require('mongoose');

// Simple Post Schema
const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,   // Added for Blog Title
  image: String,
  caption: String,
  likes: [],
  comments: []
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
