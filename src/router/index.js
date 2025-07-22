// router/index.js
const express = require("express");
const main = require("./main");
const cart = require("./cart");
const comment = require("./comments");
const checkout = require("./checkOut");
const admin = require("./admin");

const Router = express.Router();

Router.use(main);
Router.use(cart);
Router.use(comment);
Router.use(checkout);
Router.use(admin);

module.exports = Router;
