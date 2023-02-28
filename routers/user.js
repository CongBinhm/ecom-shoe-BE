const express = require("express");
const userRouter = express.Router();
const { register, login, getUser, logout, logoutAll } = require("../controller/user");
const { userAuth } = require("../middleware");

userRouter.post("/", register);
userRouter.post("/login", login);
userRouter.delete("/logout", userAuth, logout);
userRouter.delete("/logoutAll", userAuth, logoutAll);
userRouter.get("/", userAuth, getUser);
module.exports = userRouter;
