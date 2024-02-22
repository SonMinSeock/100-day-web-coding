const Cart = require("../models/cart.model");

function initializeCart(req, res, next) {
  console.log("Cart initalize...");
  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  } else {
    const sessionCart = req.session.cart;

    cart = new Cart(sessionCart.items, sessionCart.totalQunatity, sessionCart.totalPrice);
  }

  res.locals.cart = cart;

  next();
}

module.exports = initializeCart;
