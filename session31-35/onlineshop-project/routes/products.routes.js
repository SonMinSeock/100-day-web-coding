const express = require("express");

const router = express.Router();

router.get("/products", function (req, res) {
  res.render("products/all-products");
});
module.exports = router;
