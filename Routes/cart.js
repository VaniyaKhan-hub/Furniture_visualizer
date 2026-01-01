const express = require("express");
const router = express.Router();
const CartController = require("../Controller/CartController");

router.post("/addcart/:pid", CartController.addcart);
router.get("/remove/:pid", CartController.removecart);
router.get('/cartcount', CartController.getCartCount);
router.get('/checkout', CartController.checkout);
router.post('/update-quantity', CartController.updateQuantity);

module.exports=router
