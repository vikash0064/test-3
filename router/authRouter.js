const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const multer = require('multer');
const { uploadImage } = require('../utils/cloudinary');

const upload = multer();

// 1. Register Page
router.get('/register', (req, res) => {
  res.render('register', { error: req.flash('error') });
});

// 2. Handle Register
router.post('/register', upload.single('avatar'), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let avatarUrl = '';

    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      avatarUrl = result.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, avatar: avatarUrl });

    await user.save();
    res.redirect('/login');
  } catch (err) {
    req.flash('error', 'Registration failed. Try another username.');
    res.redirect('/register');
  }
});

// 3. Login Page
router.get('/login', (req, res) => {
  res.render('login', { error: req.flash('error') });
});

// 4. Handle Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
    res.cookie('token', token);
    res.redirect('/');
  } else {
    req.flash('error', 'Invalid username or password.');
    res.redirect('/login');
  }
});

// 5. Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

// 6. User Profile
router.get('/user/:id', auth, async (req, res) => {
  const user = await User.findById(req.params.id);
  const posts = await Post.find({ user: req.params.id }).sort({ createdAt: -1 });
  res.render('profile', { user, posts });
});

// 7. Settings Page
router.get('/settings', auth, (req, res) => {
  res.render('settings', { user: req.user });
});

// 8. Update Settings
router.post('/settings', auth, upload.single('avatar'), async (req, res) => {
  try {
    const { username, email, name, bio } = req.body;
    let updateData = { username, email, name, bio };

    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      updateData.avatar = result.secure_url;
    }

    await User.findByIdAndUpdate(req.user._id, updateData);
    res.redirect(`/user/${req.user._id}`);
  } catch (err) {
    res.redirect('/settings');
  }
});

module.exports = router;