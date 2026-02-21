require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');

async function debugUsers() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('--- Checking Database ---');

    const posts = await Post.find();
    console.log(`Total Posts: ${posts.length}`);

    for (const post of posts) {
        console.log(`Post ID: ${post._id}, User ID in Post: ${post.user}`);
        const user = await User.findById(post.user);
        if (user) {
            console.log(`User Found: ${user.username}`);
        } else {
            console.log('USER NOT FOUND IN USERS COLLECTION!');
        }
    }

    const users = await User.find();
    console.log(`Total Users: ${users.length}`);
    users.forEach(u => console.log(`User: ${u.username}, ID: ${u._id}`));

    process.exit();
}
debugUsers();
