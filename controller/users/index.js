const register = require("./register");
const login = require("./login");
const { logout, logoutAll } = require("./logout");
const getUser = require("./getUser");
const updateUser = require("./updateUser");
module.exports = { register, login, logout, updateUser, logoutAll, getUser };
