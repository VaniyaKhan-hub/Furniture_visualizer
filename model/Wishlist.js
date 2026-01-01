const mongoose=require('mongoose');

const WishlistSchema=new mongoose.Schema({
     userId: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Wishlist',WishlistSchema)