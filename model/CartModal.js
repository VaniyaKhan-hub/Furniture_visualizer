const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  productid: {
    type: String,
  },
  quantity: {
    type: Number,
  }
});

module.exports = mongoose.model("Cart", CartSchema);
