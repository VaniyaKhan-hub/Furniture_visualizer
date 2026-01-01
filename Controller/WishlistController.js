const Wishlist = require('../model/Wishlist');
const productModal = require('../model/ProductModel');

//Add Product to Wishlist
const add = async (req, res) => {

    const userid = req.session.userid;
    const productid = req.params.id;

    if (!userid) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
        const exists = await Wishlist.findOne({ userId: userid, productId: productid });

        if (exists) {
            return res.status(200).json({ message: 'Already in wishlist' });
        }

        const data = await Wishlist.create({
            userId: userid,
            productId: productid
        })

        if (data) {
            res.status(201).json({ message: 'Added to wishlist' });
        }
    }

    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
}
// Remove from wishlist
const remove = async (req, res) => {

    const userid = req.session.userid;
    const productid = req.params.id;

     if (!userid) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    try {
        await Wishlist.findOneAndDelete({ userId: userid, productId: productid });
        res.status(200).json({ message: 'Removed from wishlist' });
    }

    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
}

const view=async (req,res)=>{
   const uid = req.session.userid;
     if (uid) {
       const wish_records = await Wishlist.find({ userId: uid });
   
       let productrecords = [];
       for (let index = 0; index < wish_records.length; index++) {
         productrecords.push(await productModal.findById(wish_records[index].productId));
       }
   
       res.render('wishlist', { productrecords, wish_records });
     }
     else {
   
       res.redirect('/login');
     }
}

module.exports = { add, remove,view }