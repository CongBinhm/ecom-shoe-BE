const register = require("./register");
const login = require("./login");
const { logout, logoutAll } = require("./logout");
const getUser = require("./getUser");

module.exports = { register, login, logout, logoutAll, getUser };
