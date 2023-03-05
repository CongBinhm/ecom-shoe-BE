const express = require("express");
const CartRouter = express.Router();

const {
  addCart,
  getCart,
  DeleteCartItem,
  updateCart,
} = require("../controller/carts");

const { userAuth } = require("../middleware");

CartRouter.get("/", userAuth, getCart);
CartRouter.post("/", userAuth, addCart);
CartRouter.delete("/", userAuth, DeleteCartItem);
CartRouter.put("/", userAuth, updateCart);

module.exports = CartRouter;
