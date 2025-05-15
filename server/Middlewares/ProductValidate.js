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

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({ message: "Unauthorized", success: false });
  }

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res
      .status(403)
      .json({ message: "Unauthorized JWT token is wrong", success: false });
  }
};
module.exports = { productValidation, checkProductExist, ensureAuthenticated };
