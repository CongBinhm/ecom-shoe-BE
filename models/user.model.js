require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const secretKey = process.env.JWT_KEY;

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
UserSchema.method.createAccessToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, secretKey);
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
module.exports = mongoose.model("User", UserSchema);
