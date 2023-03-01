const express = require('express');
const userAuth = require('../middleware/userAuth');

const router = express.Router();

const {addCart, deleteCartItem} = require('../controller/cart');

router.post("/cart", userAuth, addCart);

router.post('/cart-delete-item', userAuth, deleteCartItem);