const ProductModel = require('../model/ProductModel');
const WishlistModel = require('../model/Wishlist');
const cartModal = require('../model/CartModal');
const UserModel = require('../model/UserModel');

const index=async (req,res)=> {
    let userid = req.session.userid;
    let user = await UserModel.findById(userid);
    data = undefined;
    if(user){
        data = user;
    }
    res.render('index' , {data});
}

const products=async (req,res)=> {
    let userid = req.session.userid;
    let user = await UserModel.findById(userid);
    let data = undefined;
    if(user){
        data = user;
    }
    const products = await ProductModel.find({});
    res.render('Products', { data, products })
}
const about=async (req,res)=> {
    res.render('About' , { data})
}

const cart=async (req,res)=> {
    res.render('cart')
}

const signup = (req, res) => {
  res.render("auth/signup");
};

const login = (req, res) => {
  res.render("auth/login");
};
const viewdetails = async (req, res) => {
  const id = req.params.id;
  const data = await ProductModel.findById(id)
  res.render("Details", { data });
};

const addcart = async (req, res) => {
  const uid = req.session.userid;
  const pid = req.params.id;

  if (uid) {
    const checkcart = await cartModal.findOne({ userid: uid, productid: pid });
    if (checkcart) {
      let plusquantity = checkcart.quantity + 1;
      let isdone = await cartModal.findByIdAndUpdate(checkcart._id, { quantity: plusquantity });
      if (isdone) {
        await WishlistModel.findOneAndDelete({productId:pid});
        res.redirect('/wishlist/viewlist');
      }
      else {
        res.json({ success: false });

      }
    }
    else {
      const cartdata = await cartModal.create({
        userid: uid,
        productid: pid,
        quantity: 1
      })
      if (cartdata) {
        await WishlistModel.findOneAndDelete({ productId: pid });

        res.redirect('/wishlist/viewlist');
      }
      else {
        res.json({ success: false })
      }
    }
  }
};

const wishremove = async (req, res) => {
  const pid = req.params.id;
  const data = await WishlistModel.findOneAndDelete({productId:pid});
  if(data){

    res.redirect('/wishlist/viewlist');
  }
};

module.exports = {
  index, login, signup, viewdetails, products, about, cart, addcart,wishremove
}