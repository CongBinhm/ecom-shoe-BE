require("dotenv").config();
const Product = require('../../models/product.model');
const Order =require('../../models/order.model');
const User = require('../../models/user.model');

exports.AddCart = async (req, res, next) => {
    const prodId = req.body.productId;
    try {
        product = Product.findById(prodId)
        await req.user.addToCart(product);
        return res.status(200).json({
            message: "Add To Cart"})
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}