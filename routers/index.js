
const express = require("express");
const usersRouter = require("./users");
const productsRouter = require("./products");
const cartRouter = require("./carts");
const router = express.Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/carts", cartRouter);
module.exports = router;
