const Carts = require("../modals/Carts");

const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await Carts.find(query).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  console.log("hello");
  const { menuItemId, name, recipe, image, price, quatity, email } = req.body;
  try {
    const existingCart = await Carts.findOne({ menuItemId });
    if (existingCart) {
      return res.status(400).json({ message: "Product already exist" });
    }
    const cartItem = await Carts.create({
      menuItemId,
      name,
      price,
      quatity,
      email,
      image,
    });
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Carts.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(deletedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const updatedCart = await Carts.findByIdAndUpdate(
      cartId,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    if (!updatedCart) {
      console.log("yes");
      return res.status(404).json({ message: "error" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart,
};
