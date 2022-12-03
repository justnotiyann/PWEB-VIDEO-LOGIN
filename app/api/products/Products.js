const db = require("../../config/db");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const productsSchema = new Schema(
  {
    title: String,
    price: String,
    author: String,
  },
  { timestamps: true }
);

const Products = db.model("product", productsSchema);

module.exports = Products;
