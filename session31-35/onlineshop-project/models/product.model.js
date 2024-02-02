const db = require("../data/database");
const mongodb = require("mongodb");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; // 이미지 파일 이름.
    this.updateImageData();
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
    return new Product(product);
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  updateImageData() {
    this.imagePath = `product-data/image/${this.image}`;
    this.imageUrl = `/prodcuts/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    if (this.id) {
      // 수정 작업!
      const productId = new mongodb.ObjectId(this.id); // String -> ObejctId 변환
      if (!this.image) {
        delete productData.image;
      }
      await db.getDb().collection("products").updateOne({ _id: productId }, { $set: productData });
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
  }

  replaceImage(newImage) {
    // newImage는 이미지 파일 이름이다.
    this.image = newImage;
    this.updateImageData();
  }

  remove() {
    const productId = new mongodb.ObjectId(this.id);

    return db.getDb().collection("products").deleteOne({ _id: productId });
  }
}

module.exports = Product;
