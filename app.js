const http=require('http');
const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const WebRoutes=require('./Routes/webRoutes');
const AuthRoutes = require("./Routes/auth");
const DashRoutes = require("./Routes/dash");
const wishlistRoutes = require('./Routes/Wishlist');
const cartRoutes = require('./Routes/cart');
const session = require("express-session");
const midleware=require('./middleware/authcheck');
const app=express();
// Set View Engine
app.set('view engine','ejs');
// Body Parser
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
  secret:"mysecret",
  resave:false,
  saveUninitialized:false
}));
app.use(express.static("public"));
// Set Routes
app.use('/',WebRoutes);
app.use("/auth", AuthRoutes);
app.use("/dash",midleware.checkuser,DashRoutes);
app.use('/wishlist',wishlistRoutes);
app.use('/cart',cartRoutes);

// Connect to MongoDB and Start Server
mongoose.connect('mongodb://localhost:27017/furniture_visualizer').then(()=>console.log('DB Connected')).
catch((e)=>console.log('DB Connection Failed!'));
http.createServer(app).listen(5050,()=>console.log('Server is running at http://localhost:5050'));