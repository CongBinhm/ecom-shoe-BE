const express = require("express");
const CartRouter = express.Router();

const {
  addCart,
  getCart,
  deleteCartItem,
  updateCartItem,
} = require("../controller/carts");

const { userAuth } = require("../middleware");

CartRouter.get("/", userAuth, getCart);
CartRouter.post("/", userAuth, addCart);
CartRouter.delete("/:itemId", userAuth, deleteCartItem);
CartRouter.put("/:itemId", userAuth, updateCartItem);

module.exports = CartRouter;
