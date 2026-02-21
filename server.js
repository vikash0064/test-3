require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookies = require("cookie-parser");
const session = require('express-session');
const flash = require('connect-flash');

const authRoutes = require("./router/authRouter");
const postRoutes = require("./router/postRouter");

const app = express();
const PORT = process.env.PORT || 3000;

// APP CONFIGURATION
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());

app.use(session({
   secret: process.env.JWT_SECRET || 'keyboard cat',
   resave: false,
   saveUninitialized: true,
   cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));
app.use(flash());

// MONGODB CONNECTION
mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log("Connected to MongoDB Atlas"))
   .catch((err) => console.error("MongoDB connection error:", err));

// ROUTES
app.use("/", authRoutes);
app.use("/", postRoutes);

// SERVER START
app.listen(PORT, () => {
   console.log(` Server running on http://localhost:${PORT}`);
});
