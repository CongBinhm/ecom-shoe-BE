require("dotenv").config();
const Product = require("../../models/product.model");
const formatProductDataResponse = require("../../services/formatProductDataResponse");

const addProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const productData = req.body;
    const { name, description, price, original_price, stock } = productData;
    const newProduct = new Product({
      name: name,
      description: description,
      price: Boolean(price) ? price : 0,
      original_price: Boolean(original_price) ? original_price : 0,
      stock: Boolean(stock) ? stock : 0,
      rating: 0,
      userId: userId,
    });
    await newProduct.save();
    return res.status(200).json({
      message: "Add product success",
      data: formatProductDataResponse(newProduct, 0),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = addProduct;
