const User = require("../../models/user.model");
require("dotenv").config();
const adminRegisterKey = process.env.adminRegisterKey;

const updateUser = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, avatar_img, admin_key } =
      req.body;
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        first_name,
        last_name,
        phone_number,
        avatar_img,
        role: admin_key === adminRegisterKey ? "admin" : "user",
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateUser;
