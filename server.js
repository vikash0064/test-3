require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookies = require("cookie-parser");

const authRoutes = require("./router/authRouter");
const postRoutes = require("./router/postRouter");

const app = express();
const PORT = process.env.PORT || 3000;






//  APP CONFIGURATION

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());

const session = require('express-session');
// ...existing code...

mongoose
mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log("Connected to MongoDB Atlas"))
   .catch((err) => console.error("MongoDB connection error:", err));


//  ROUTES


var flash = require('connect-flash');
app.use(session({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: true,
   cookie: { maxAge: 60000 }
}));
app.use(flash());

app.use("/", authRoutes);
app.use("/", postRoutes);


//  SERVER START


app.listen(PORT, () => {
   console.log(` Server running on http://localhost:${PORT}`);
});
