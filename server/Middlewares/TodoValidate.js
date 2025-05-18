const JOI = require("joi");

const TodoValidation = (req, res, next) => {
  const schema = JOI.object({
    task: JOI.string().min(3).max(70).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message, success: false });
  }
  next();
};

module.exports = TodoValidation;
