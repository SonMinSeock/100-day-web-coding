const Product = require("../models/product.model");

async function getProducts(req, res, next) {
  let products;

  try {
    products = await Product.findAll();
    console.log(products);
  } catch (error) {
    next(error);
  }
  res.render("admin/products/all-products", { products: products });
}

function getNewProduct(req, res) {
  res.render("admin/products/new-product");
}

async function createNewProduct(req, res, next) {
  console.log(req.body);
  console.log(req.file);
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function getUpdateProduct(req, res, next) {
  const { params: id } = req;
  try {
    const product = await Product.findById(id);
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
    return;
  }
}

async function upldateProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  // 이미지 선택했으면 이미지 수정한다는 의미이다.
  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

module.exports = {
  getProducts,
  getNewProduct,
  createNewProduct,
  getUpdateProduct,
  upldateProduct,
};
