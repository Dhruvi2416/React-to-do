const JOI = require("joi");

const signUpValidation = (req, res, next) => {
  const schema = JOI.object({
    name: JOI.string().min(3).max(100).required(),
    email: JOI.string().email().required(),
    password: JOI.string().min(3).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = JOI.object({
    email: JOI.string().email().required(),
    password: JOI.string().min(3).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request" });
  }
  next();
};

module.exports = {
  signUpValidation,
  loginValidation,
};
