const User = require("../../models/user.model");
const formatUserDataResponse = require("../../services/formatUserDataResponse");
require("dotenv").config();
const adminRegisterKey = process.env.adminRegisterKey;

const register = async (req, res) => {
  try {
    const {
      email,
      first_name,
      last_name,
      phone_number,
      password,
      adminKey,
      avatar_img,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const user = new User({
      email,
      first_name,
      last_name,
      phone_number,
      password: password,
      avatar_img,
      role: adminKey === adminRegisterKey ? "admin" : "user",
      cart: {
        grand_total: 0,
        subtotal: 0,
        discount_amount: 0,
      },
    });
    await user.save();
    res.status(201).json({
      message: "Create user success",
      data: formatUserDataResponse(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = register;
