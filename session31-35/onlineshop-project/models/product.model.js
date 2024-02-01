const db = require("../data/database");
const mongodb = require("mongodb");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; // 이미지 파일 이름.
    this.imagePath = `product-data/image/${productData.image}`;
    this.imageUrl = `/prodcuts/assets/images/${productData.image}`;
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findById(productId) {
    try {
      productId = new mongodb.ObjectId(productId); // String -> ObejctId 변환
    } catch (error) {
      error.code = 404;
      throw error;
    }

    const product = await db.getDb().collection("products").findOne({ _id: productId });

    if (!product) {
      const error = new Error("해당 제품 찾지 못했습니다.");
      error.code = 404;
      throw error;
    }
    return product;
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    await db.getDb().collection("products").insertOne(productData);
  }
}

module.exports = Product;
