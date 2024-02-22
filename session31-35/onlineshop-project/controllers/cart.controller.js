const Product = require("../models/product.model");

function getCart(req, res) {
  res.render("customer/cart/cart");
}

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

function updateCartItem(req, res) {
  const cart = res.locals.cart;

  const updatedCartItemData = cart.updateItem(req.body.productId, req.body.quantity);

  req.session.cart = cart;

  res.json({
    message: "Item Updated!",
    updatedCartData: {
      newTotalQunatity: cart.totalQunatity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedCartItemData.updatedItemPrice,
    },
  });
}

module.exports = {
  addCartItem,
  getCart,
  updateCartItem,
};
