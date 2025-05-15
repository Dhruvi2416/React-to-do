const jwt = require("jsonwebtoken");
const ProductModel = require("../Models/Product.js");

const logProduct = async (req, res) => {
  try {
    const { productName, productPrice } = req.body;
    const product = await ProductModel.findOne({ productName });
    if (product) {
      return res
        .status(409)
        .json({ message: "Product already exists", sucess: false });
    }

    const productModel = new ProductModel({ productName, productPrice });
    await productModel.save();
    res
      .status(200)
      .json({ message: "Product logged succesfull", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { productName, productPrice } = req.body;
    const product = await ProductModel.findOne({ productName });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    res.status(200).json({
      message: "Product found",
      success: true,
      productName,
      productPrice,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server error", success: false });
  }
};


module.exports = { logProduct, searchProduct };
