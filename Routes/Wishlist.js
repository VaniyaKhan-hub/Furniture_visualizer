const express=require('express');
const router=express.Router();
const wishlistController=require('../Controller/WishlistController');

router.post('/add/:id',wishlistController.add);
router.post('/remove/:id',wishlistController.remove);
router.get('/viewlist',wishlistController.view);

module.exports=router