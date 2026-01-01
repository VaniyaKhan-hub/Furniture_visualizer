const express=require('express');
const router=express.Router();
const webController=require('../Controller/WebController');
const CartController = require("../Controller/CartController.js");

router.get('/',webController.index);
router.get('/products',webController.products);
router.get('/about',webController.about);
router.get('/cart',CartController.viewcart);
router.get("/details/:id", webController.viewdetails);
router.get("/login", webController.login);
router.get("/register", webController.signup);
router.get('/wishremove/:id',webController.wishremove);
router.get('/addcart/:id',webController.addcart);
router.get('/checkout',CartController.checkout);
module.exports=router