require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUpdateCartQuantity = require("../services/getUpdateCartQuantity");
const getGrand_Total = require("../services/getGrand_total");

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
      items_total: { type: Number, required: true },
      discount_amount: { type: Number, required: true },
      products: [
        {
          product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product",
          },
          size_id: { type: Schema.Types.ObjectId, required: true },
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

UserSchema.methods.addToCart = function(product, size) {
  const cartProductIndex = this.cart.products.findIndex(prodId => {
    return prodId.product.toString() === product._id.toString() && prodId.size_id.toString() === size._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart];
  const newProduct = [...this.cart.products]
  let Newsubtotal = product.price;
  newTotal += Newsubtotal;

  if(cartProductIndex >= 0) {
    newQuantity = this.cart[cartProductIndex].products.quantity + 1;
    updatedCartItems[cartProductIndex].products.quantity = newQuantity;
    
    newTotal = this.cart[cartProductIndex].subTotal + newTotal;
    updatedCartItems[cartProductIndex].grand_total = newTotal;
  } else {
    newProduct.push({
      product: product._id,
      quantity: newQuantity,
      selected: true,
      size_id: size._id
    });
    updatedCartItems.push({
      grand_total: newTotal,
      items_total: Newsubtotal,
      discount_amount: 0.0,
      products: newProduct,
    });
  }
  this.cart = updatedCartItems;
  return this.save;
}

UserSchema.methods.removeFromCart = async function(productId, sizeId){
  const updatedCart = this.cart.filter(items => {
    return items.products.product.toString() === items.productId.toString() && items.products.size_id === sizeId.toString();
  });
  this.cart = updatedCart;
  await this.save();
}

UserSchema.post("findOneAndUpdate", async function(doc){
  const update = this.getUpdate();
  if(
    (update.$pull && update.$pull.cart) ||
    (update.$push && update.$push.cart) ||
    (update.$set &&
      update.$set.cart || update.$set["cart.$.products.quantity"])
  ) {
    const [newQuantity] = getUpdateCartQuantity(doc.cart.products);
    doc.cart.products.quantity = newQuantity;
    const total = getGrand_Total(doc.cart);
    doc.cart.grand_total = total;
    await doc.save();
  }
})

module.exports = mongoose.model("User", UserSchema);
