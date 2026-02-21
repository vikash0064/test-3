require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');

async function removeOrphanedPosts() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('--- Cleaning Orphaned Posts ---');

    const posts = await Post.find();
    let deletedCount = 0;

    for (const post of posts) {
        const user = await User.findById(post.user);
        if (!user) {
            await Post.findByIdAndDelete(post._id);
            console.log(`Deleted orphaned post: ${post._id}`);
            deletedCount++;
        }
    }

    console.log(`Cleaned up ${deletedCount} orphaned posts.`);
    process.exit();
}
removeOrphanedPosts();
