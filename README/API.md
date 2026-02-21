# Mini Insta API Endpoints

This project is a simple Instagram-like app built with Node.js, Express, MongoDB, JWT, and EJS. Below are all available API endpoints for reference and testing.

## Authentication
- `GET  /register`           — Show registration form
- `POST /register`          — Register a new user
- `GET  /login`             — Show login form
- `POST /login`             — Login user
- `GET  /logout`            — Logout user

## User
- `GET  /user/:id`          — View user profile
- `GET  /user/:id/settings` — Show user settings form
- `POST /user/:id/settings` — Update user settings

## Posts
- `POST /post`              — Create a new post
- `GET  /post/new`          — Show new post form
- `GET  /`                  — Show feed (all posts)
- `POST /post/:id/edit`     — Edit a post
- `POST /post/:id/delete`   — Delete a post
- `POST /post/:id/like`     — Like/unlike a post
- `POST /post/:id/comment`  — Add a comment to a post

## Notes
- All endpoints require authentication unless otherwise specified.
- Image uploads are stored as base64 in MongoDB.
- Flash messages are used for feedback.

---
For more details, see the source code or contact the repository owner.
