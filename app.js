const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const session = require("express-session");

const WebRoutes = require('./Routes/webRoutes');
const AuthRoutes = require("./Routes/auth");
const DashRoutes = require("./Routes/dash");
const wishlistRoutes = require('./Routes/Wishlist');
const cartRoutes = require('./Routes/cart');
const middleware = require('./middleware/authcheck');

const app = express();

// View Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "mysecret",
  resave: false,
  saveUninitialized: false
}));

app.use(express.static("public"));

// Routes
app.use('/', WebRoutes);
app.use("/auth", AuthRoutes);
app.use("/dash", middleware.checkuser, DashRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/cart', cartRoutes);

// ✅ MongoDB Connection (NO localhost)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("DB Connection Failed", err);
  }
};

connectDB();

// ⭐ EXPORT APP (VERY IMPORTANT)
module.exports = app;
