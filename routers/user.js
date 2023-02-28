const express = require("express");
const userRouter = express.Router();
const { register, login, getUser, logout } = require("../controller/user");
const { userAuth } = require("../middleware");

userRouter.post("/", register);
userRouter.post("/login", login);
userRouter.delete("/logout", userAuth, logout);
userRouter.get("/", userAuth, getUser);
module.exports = userRouter;
