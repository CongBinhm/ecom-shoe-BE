const getProductById = require("./getProductById");
const addProduct = require("./addProduct");
const updateProduct = require("./updateProduct");
const deleteProduct = require("./deleteProduct");
const getProducts = require("./getProducts");
const addProductSize = require("./addProductSize");
const updateProductSize = require("./updateProductSize");
module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  addProductSize,
  updateProductSize,
};
