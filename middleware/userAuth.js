const jwt = require("jsonwebtoken");
const User = require("../models/user.modal");
require("dotenv").config();
const secretKey = process.env.JWT_KEY;

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    const user = await User.findOne({
      _id: decodedToken.userId,
    });
    if (!user) res.status(500).json({ error: "Can't find user" });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = userAuth;
