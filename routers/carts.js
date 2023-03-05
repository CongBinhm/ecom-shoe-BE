const express = require("express");
const CartsRouter = express.Router();

const { AddCart, GetCart, DeleteCartItem, updateCart } = require("../controller/carts");

const {userAuth}= require("../middleware")

CartsRouter.get('/cart', userAuth, GetCart);
CartsRouter.post('/cart', userAuth, AddCart);
CartsRouter.delete('delete-cart', userAuth, DeleteCartItem);
CartsRouter.put('/update-cart', userAuth, updateCart);

module.exports = CartsRouter;