const JOI = require("joi");
const jwt = require("jsonwebtoken");
const signUpValidation = (req, res, next) => {
  const schema = JOI.object({
    name: JOI.string().min(3).max(11).required(),
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

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized - Token is missing", success: false });
  }

  try {
    // const token = auth.split(" ")[1];
    const decoded = jwt.verify(auth, process.env.JWT_SECRETKEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: err.message, success: false });
  }
};

module.exports = {
  signUpValidation,
  loginValidation,
  ensureAuthenticated,
};
