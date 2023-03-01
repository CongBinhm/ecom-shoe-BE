const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user.model");
db.cart = require("./cart.model");
db.product = require("./product.model");

module.exports = db;
