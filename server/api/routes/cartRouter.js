const express = require("express");
const Carts = require("../modals/Carts");
const {
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart,
} = require("../controllers/cartController");
const router = express.Router();

router.get("/", getCartByEmail);

router.post("/", addToCart);

router.delete("/:id", deleteCart);
router.put("/:id", updateCart);
module.exports = router;
