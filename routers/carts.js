const express = require("express");
const CartsRouter = express.Router();

const { AddCart, GetCart } = require("../controller/carts");

const {userAuth}= require("../middleware")

CartsRouter.get('/cart', userAuth, GetCart);
CartsRouter.post('/cart', userAuth, AddCart);

module.exports = CartsRouter;