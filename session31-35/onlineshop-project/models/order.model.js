const db = require("../data/database");

class Order {
  // status => pending, fulfilled, cancelled
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    (this.status = status), (this.date = new Date(date));
    if (this.date) {
      this.dateFormattedDate = this.date.toLocaleDateString("ko-KR", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    this.id = orderId;
  }

  save() {
    if (this.id) {
      // 기존 주문에 업데이트 ...
    } else {
      // 새로 만들어서 저장...
      const orderDocument = {
        userData: this.userData,
        productData: this.productData,
        date: new Date(),
        status: this.status,
      };

      return db.getDb().collection("orders").insertOne(orderDocument);
    }
  }
}

module.exports = Order;
