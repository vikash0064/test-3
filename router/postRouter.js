const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const multer = require('multer');
const { uploadImage } = require('../utils/cloudinary');

const upload = multer(); // For handling file uploads

// 1. Show New Post Page
router.get('/post/new', auth, (req, res) => {
  res.render('newpost');
});

// 2. Save New Post
router.post('/post', auth, upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';

    // Upload image to Cloudinary if it exists
    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      imageUrl = result.secure_url;
    }

    // Create and save the post
    const newPost = new Post({
      user: req.user.id,
      title: req.body.title, // Added title
      image: imageUrl,
      caption: req.body.caption
    });

    await newPost.save();
    res.redirect('/');
  } catch (err) {
    res.render('newpost', { error: 'Failed to create post.' });
  }
});

// 3. Show All Posts (Home) with Pagination
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page
    const limit = 5; // Posts per page
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find()
      .populate('user')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    console.log('Posts fetched:', posts.length);
    posts.forEach((p, i) => {
      console.log(`Post ${i} user:`, p.user ? p.user.username : 'NULL (Orphaned)');
    });

    res.render('index', {
      posts,
      user: req.user,
      currentPage: page,
      totalPages: totalPages
    });
  } catch (err) {
    console.error('Home Route Error:', err);
    res.render('index', { posts: [], user: req.user, error: 'Failed to load posts', currentPage: 1, totalPages: 1 });
  }
});

// 4. Like a Post
router.post('/post/:id/like', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user.id)) {
    post.likes.push(req.user.id);
  } else {
    // Unlike if already liked
    post.likes = post.likes.filter(id => id.toString() !== req.user.id);
  }
  await post.save();
  res.redirect('/');
});

// 5. Add Comment
router.post('/post/:id/comment', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  const newComment = {
    username: req.user.username,
    avatar: req.user.avatar, // Added avatar
    text: req.body.comment
  };
  post.comments.push(newComment);
  await post.save();
  res.redirect('/');
});

// 6. Delete Post
router.post('/post/:id/delete', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.user.toString() === req.user.id) {
    await Post.findByIdAndDelete(req.params.id);
  }
  res.redirect('/');
});

// 7. View Post Details (Insta-like split view)
router.get('/post/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user');
    res.render('viewpost', { post, user: req.user });
  } catch (err) {
    res.redirect('/');
  }
});

// 8. Show Edit Post Page
router.get('/post/:id/edit', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.user.toString() !== req.user.id) {
      return res.redirect('/');
    }
    res.render('editpost', { post, user: req.user });
  } catch (err) {
    res.redirect('/');
  }
});

// 9. Update Post
router.post('/post/:id/edit', auth, upload.single('image'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.user.toString() !== req.user.id) {
      return res.redirect('/');
    }

    let updateData = { caption: req.body.caption };

    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      updateData.image = result.secure_url;
    }

    await Post.findByIdAndUpdate(req.params.id, updateData);
    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    res.redirect('/');
  }
});

module.exports = router;