const cartModal = require('../model/CartModal');
const productModal = require('../model/ProductModel');
const userModal = require('../model/UserModel');

const viewcart = async (req, res) => {
  const uid = req.session.userid;
  if (uid) {
    const cart_records = await cartModal.find({ userid: uid });

    let productrecords = [];
    let totalAmount = 0;
    for (let index = 0; index < cart_records.length; index++) {
      const product = await productModal.findById(cart_records[index].productid);

      if (product) {
        productrecords.push(product);
        const quantity = cart_records[index].quantity || 1;
        totalAmount += product.Price * quantity;
      }
    }

    res.render('cart', { productrecords, cart_records, totalAmount });
  }
  else {

    res.redirect('/login');
  }
}

const addcart = async (req, res) => {
  const uid = req.session.userid;
  const pid = req.params.pid;

  if (!uid) {
    return res.status(401).json({ message: "Please login to add items to cart." });
  }

  const checkcart = await cartModal.findOne({ userid: uid, productid: pid });

  if (checkcart) {
    const plusquantity = checkcart.quantity + 1;
    const isdone = await cartModal.findByIdAndUpdate(checkcart._id, { quantity: plusquantity });

    if (isdone) {
      return res.json({ message: "Product quantity updated in cart", status: "updated" });
    } else {
      return res.status(500).json({ message: "Failed to update cart" });
    }
  } else {
    const cartdata = await cartModal.create({
      userid: uid,
      productid: pid,
      quantity: 1
    });

    if (cartdata) {
      return res.json({ message: "Product added to cart", status: "added" });
    } else {
      return res.status(500).json({ message: "Failed to add product to cart" });
    }
  }
};

// Remove Product from cart
const removecart = async (req, res) => {
  const uid = req.session.userid;
  const pid = req.params.pid;


  const cartdata = await cartModal.findOneAndDelete({
    userid: uid,
    productid: pid,
  });

  if (cartdata) {
    res.redirect('/cart');
  }
};


const getCartCount = async (req, res) => {
  const uid = req.session.userid;

  if (!uid) {
    return res.json({ count: 0 });
  }

  try {
    const cartItems = await cartModal.find({ userid: uid });
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    res.json({ count });
  } catch (error) {
    console.error("Cart count error:", error);
    res.status(500).json({ count: 0 });
  }
};


const updateQuantity = async (req, res) => {
  const uid = req.session.userid;
  const { productid, quantity } = req.body;

  if (!uid) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const updated = await cartModal.findOneAndUpdate(
      { userid: uid, productid },
      { quantity },
      { new: true }
    );
    // console.log("BODY RECEIVED:", req.body);


    if (updated) {
      return res.json({ success: true, message: "Quantity updated successfully" });
    } else {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }
  } catch (err) {
    console.error("Error updating quantity:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const checkout = async (req, res) => {
  const uid = req.session.userid;
  if (uid) {
    const cart_records = await cartModal.find({ userid: uid });
    const user_records = await userModal.findById(uid);

    let productrecords = [];
    let totalAmount = 0;
    for (let index = 0; index < cart_records.length; index++) {
      const product = await productModal.findById(cart_records[index].productid);

      if (product) {
        productrecords.push(product);
        const quantity = cart_records[index].quantity || 1;
        totalAmount += product.Price * quantity;
      }
    }

    res.render('checkout', { productrecords, cart_records, totalAmount,user_records });
  }
  else {

    res.redirect('/cart');
  }
}

module.exports = {
  viewcart,
  addcart,
  removecart,
  getCartCount,
  checkout,
  updateQuantity
};

