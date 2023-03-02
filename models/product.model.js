const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name can't be empty"],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    original_price: {
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
        name: { type: String, required: true, unique: true },
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

module.exports = mongoose.model("Product", productSchema);
