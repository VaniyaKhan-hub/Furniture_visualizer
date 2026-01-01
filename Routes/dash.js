const express = require("express");
const router = express.Router();
const DashController = require("../Controller/dash.controller.js");
const AuthController = require("../Controller/authHandler.js");
const CartController = require("../Controller/CartController.js");
const multer = require("multer");

const storage=multer.diskStorage({
    destination:'./public/assets/uploads',
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({storage})

router.get("/",DashController.dashboard);
router.get("/users" , DashController.users);
router.get("/products" , DashController.products);
router.get("/category" , DashController.category);
router.get("/addproduct",DashController.addproduct);
router.post('/uploadproducts', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 }
]), DashController.uploadproduct);
router.get("/logout",AuthController.logout);
router.get("/addcart/:pid", CartController.addcart);
router.get("/delete/:id" , DashController.deleteuser);
router.get("/addcategory" , DashController.addcategory);
router.post("/uploadcategory" , DashController.uploadcategory);
router.get("/deleteproduct/:id" , DashController.deleteproduct);
router.get("/editproduct/:id" , DashController.updateproduct);
router.post("/editproduct", upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]), DashController.editproduct);
router.get("/deletecategory/:id" , DashController.deletecategory);
router.get("/editcategory/:id" , DashController.editcategory);
router.post("/editcategory", DashController.updatecategory);
router.get("/updateuser/:id" , DashController.updateuser);
router.post("/edituser", DashController.edituser);

module.exports = router;
