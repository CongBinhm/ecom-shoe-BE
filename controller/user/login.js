const User = require("../../models/user.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_KEY;
const expiresTime = process.env.expiresTime;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email does not exist" });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(401).json({ message: "Password not correct" });
    const token = jwt.sign({ userId: user._id.toJSON() }, secretKey, {
      expiresIn: expiresTime,
    });

    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = login;
