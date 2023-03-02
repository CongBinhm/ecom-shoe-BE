const User = require("../../models/user.model");

const updateUser = async (req, res) => {
  try {
    const { email, first_name, last_name, phone_number, avatar_img } = req.body;
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { email, first_name, last_name, phone_number, avatar_img }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateUser;
