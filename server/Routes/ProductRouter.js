const router = require("express").Router();
const {
  productValidation,
  checkProductExist,
  ensureAuthenticated,
} = require("../Middlewares/ProductValidate.js");

const {
  logProduct,
  searchProduct,
} = require("../Controllers/ProductControlles.js");

router.post("/products", productValidation, logProduct);
router.post("/productSearch", checkProductExist, searchProduct);

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json({ message: "Valid Token", success: true });
});
module.exports = router;
