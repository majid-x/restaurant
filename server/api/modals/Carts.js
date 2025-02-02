const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  menuItemId: String,
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  quatity: Number,
  image: String,
  price: Number,
  email: {
    type: String,
    true: true,
    required: true,
  },
});

const Carts = mongoose.model("Cart", new Schema(cartSchema));
module.exports = Carts;
