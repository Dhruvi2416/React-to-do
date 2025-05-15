const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
});

const ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;
