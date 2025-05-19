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

const RestoreTodoValidation = (req, res, next) => {
  const schema = JOI.object({
    task: JOI.string().min(3).max(70).required(),
    completed: JOI.boolean().required(),
    createdAt: JOI.date().required(),
    dueDate: JOI.date().required(),
    isEditing: JOI.boolean().required(),
    _id: JOI.string().required(),
    user: JOI.string().length(24).hex().required(),
  });
  const { error } = schema.validate(req.body, { stripUnknown: true });
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message, success: false });
  }
  next();
};

module.exports = { TodoValidation, RestoreTodoValidation };
