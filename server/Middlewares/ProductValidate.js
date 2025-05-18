const JOI = require("joi");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const productValidation = (req, res, next) => {
  const schema = JOI.object({
    productName: JOI.string().min(3).max(100).required(),
    productPrice: JOI.number().min(100).max(10000).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Product is not valid" });
  }
  next();
};

const checkProductExist = (req, res, next) => {
  const schema = JOI.object({
    productName: JOI.string().min(3).max(100).required(),
    productPrice: JOI.number().min(100).max(10000).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(403).json({ message: "Invalid product search" });
  }
  next();
};

module.exports = { productValidation, checkProductExist };
