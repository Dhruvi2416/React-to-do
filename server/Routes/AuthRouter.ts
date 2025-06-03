const { signup, login } = require("../Controllers/AuthControllers");
const {
  signUpValidation,
  loginValidation,
} = require("../Middlewares/AuthValidate");

const authRouter = require("express").Router();

authRouter.post("/signup", signUpValidation, signup);
authRouter.post("/login", loginValidation, login);

module.exports = authRouter;
