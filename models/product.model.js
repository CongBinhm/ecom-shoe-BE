const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const getLimitPrice = require("../services/getLimitPrice");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name can't be empty"],
    },
    min_price: {
      type: Number,
      required: true,
      min: 0,
    },
    max_price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: [true, "Description can't be empty"],
    },
    product_img: {
      type: String,
      validate: {
        validator: (value) => {
          return validator.isBase64(value);
        },
        message: `Product image must be base64`,
      },
    },
    size: [
      new Schema({
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        original_price: { type: Number, required: true, min: 0 },
        stock: { type: Number, required: true, min: 0 },
        product_img: {
          type: String,
          validate: {
            validator: (value) => {
              return validator.isBase64(value);
            },
            message: `Product image must be base64`,
          },
        },
      }),
    ],
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "product" }
);
productSchema.pre("save", async function (next) {
  const [min_price, max_price, stock] = getLimitPrice(this.size);
  this.min_price = min_price;
  this.max_price = max_price;
  this.stock = stock;
  next();
});

module.exports = mongoose.model("Product", productSchema);
