const Product = require("../models/product.model");

async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
  }

  const cart = res.locals.cart;

  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: "Cart Updated!",
    newTotalItems: cart.totalQunatity,
  });
}

module.exports = {
  addCartItem,
};
