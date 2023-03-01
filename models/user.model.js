require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_KEY;
const expiresTime = process.env.expiresTime;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid Email address",
      },
    },
    cart: {
      grand_total: { type: Number, required: true },
      subtotal: { type: Number, required: true },
      discount_amount: { type: Number, required: true },
      products: [
        {
          product: { type: Object, required: true },
          quantity: { type: Number, required: true },
          selected: { type: Boolean, required: true },
        },
      ],
    },
    role: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
            returnScore: false,
          }),
        message:
          "Password length must be longer than 8, have 1 uppercase, 1 lowercase and 1 number",
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isMobilePhone(value, "vi-VN"),
        message: `Phone number not correct type!`,
      },
    },
    avatar_img: {
      type: String,
      validate: {
        validator: (value) => {
          return validator.isBase64(value);
        },
        message: `Avatar image must be base64`,
      },
    },
  },
  { collection: "user" }
);
UserSchema.methods.createAccessToken = async function () {
  const user = this;
  const token = jwt.sign({ userId: user._id }, secretKey, {
    expiresIn: expiresTime,
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 10);
  next();
});

UserSchema.methods.addToCart = function(product){
  const cartProductIndex = this.cart.products.findIndex(prod => {
    return prod.product._id.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.products];
  let Total = 0;

  if(cartProductIndex >= 0){
    newQuantity = this.cart.products[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;

    Total = Total + this.cart.subtotal;
  } else {
    Total = this.cart.subtotal,
    updatedCartItems.push({
      product: product,
      quantity: newQuantity
    });
  }

  const updatedCart = {
    products: updatedCartItems
  };

  this.cart.products = updatedCart;
  this.cart.grand_total = Total;
  return this.save();
}

UserSchema.methods.removeFromCart = function(prodId)  {
  const updatedCartItems = this.cart.products.filter(item =>{
    return item.product._id.toString() !== prodId.toString();
  });
  this.cart.products = updatedCartItems;
  return this.save();
}

module.exports = mongoose.model("User", UserSchema);
