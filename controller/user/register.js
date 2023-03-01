require("dotenv").config();
const User = require("../../models/user.modal");
const adminRegisterKey = process.env.adminKey;

const register = async (req, res) => {
  try {
    const { email, first_name, last_name, phone_number, password, adminKey } =
      req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const user = new User({
      email,
      first_name,
      last_name,
      phone_number,
      password: password,
      role: adminKey === adminRegisterKey ? "admin" : "user",
    });
    await user.save();
    res.status(201).json({ message: "Create user success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = register;
