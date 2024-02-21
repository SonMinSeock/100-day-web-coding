class Cart {
  constructor(items = [], totalQunatity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQunatity = totalQunatity;
    this.totalPrice = totalPrice;
  }
  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === product.id) {
        cartItem.quantity = item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;

        this.totalQunatity++;
        this.totalPrice += product.price;
        return;
      }
    }

    this.items.push(cartItem);
    this.totalQunatity++;
    this.totalPrice += product.price;
  }
}

module.exports = Cart;
