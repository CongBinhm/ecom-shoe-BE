const express = require("express");
const CartRouter = express.Router();

const {
  AddCart,
  GetCart,
  DeleteCartItem,
  updateCart,
} = require("../controller/carts");

const { userAuth } = require("../middleware");

CartRouter.get("/", userAuth, GetCart);
CartRouter.post("/", userAuth, AddCart);
CartRouter.delete("/", userAuth, DeleteCartItem);
CartRouter.put("/", userAuth, updateCart);

module.exports = CartRouter;
