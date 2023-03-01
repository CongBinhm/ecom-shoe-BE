const express = require("express");
const productsRouter = express.Router();
const { getProductById } = require("../controller/products");

productsRouter.get("/:id", getProductById);

module.exports = productsRouter;
