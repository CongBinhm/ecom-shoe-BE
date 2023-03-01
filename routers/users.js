const express = require("express");
const usersRouter = express.Router();
const {
  register,
  login,
  getUser,
  logout,
  logoutAll,
} = require("../controller/users");
const {
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/products");
const { userAuth, adminAuth } = require("../middleware");

usersRouter.post("/current", register);
usersRouter.post("/current/login", login);
usersRouter.delete("/current/logout", userAuth, logout);
usersRouter.delete("/current/logoutAll", userAuth, logoutAll);
usersRouter.get("/current", userAuth, getUser);

usersRouter.post("/current/product", userAuth, adminAuth, addProduct);
usersRouter.put("/current/product/:id", userAuth, adminAuth, updateProduct);
usersRouter.delete("/current/product/:id", userAuth, adminAuth, deleteProduct);

module.exports = usersRouter;
