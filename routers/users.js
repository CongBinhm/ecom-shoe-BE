const express = require("express");
const usersRouter = express.Router();
const {
  register,
  login,
  getUser,
  logout,
  logoutAll,
} = require("../controller/users");
const { userAuth } = require("../middleware");

usersRouter.post("/current", register);
usersRouter.post("/current/login", login);
usersRouter.delete("/current/logout", userAuth, logout);
usersRouter.delete("/current/logoutAll", userAuth, logoutAll);
usersRouter.get("/current", userAuth, getUser);
module.exports = usersRouter;
