const { signup, login } = require("../Controllers/AuthControllers");
const {
  signUpValidation,
  loginValidation,
} = require("../Middlewares/AuthValidate");

const router = require("express").Router();

router.post("/signup", signUpValidation, signup);
router.post("/login", loginValidation, login);

module.exports = router;
