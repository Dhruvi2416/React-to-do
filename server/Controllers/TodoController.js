const TodoModel = require("../Models/Todo");

const addTodos = async (req, res) => {
  try {
    const { task } = req.body;
    const id = req.user._id;
    const existing = await TodoModel.findOne({ task: task, user: id });
    if (existing) {
      return res.status(400).json({
        message: "This task already exists in your list.",
        success: false,
      });
    }
    const newTodo = new TodoModel({ task, user: id });
    await newTodo.save();
    res
      .status(201)
      .json({ message: "Task added successfully!", success: true, newTodo });
  } catch (err) {
    if (err.code === 11000) {
      // MongoDB duplicate key error (from unique index)
      return res.status(400).json({
        message: "This task already exists in your list.",
        success: false,
      });
    }
    res.status(500).json({ message: err.message, success: false });
  }
};

const getTodos = async (req, res) => {
  try {
    const id = req.user._id;
    const todos = await TodoModel.find({ user: id });
    res.status(200).json({ success: true, todos: todos });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

const editTodo = async (req, res) => {

  const taskId = req.params.id;
  const userId = req.user._id;
  const { task, completed, dueDate } = req.body;

  try {
    if (task) {
      const existing = await TodoModel.findOne({ task, user: userId });

      if (existing) {
        return res.status(400).json({
          message: "This task already exists in your list.",
          success: false,
        });
      }
    }
    const updateFields = {};
    if (typeof task !== "undefined") updateFields.task = task;
    if (typeof completed !== "undefined") updateFields.completed = completed;
    if (typeof dueDate !== "undefined") updateFields.dueDate = dueDate;

    const editedTask = await TodoModel.findOneAndUpdate(
      { user: userId, _id: taskId },
      updateFields,
      { new: true }
    );
    if (!editedTask) {
      return res.status(404).json({
        message:
          "Task not found or you don't have permission to update the task",
        success: false,
      });
    }
    return res
      .status(200)
      .json({ message: "Task update successfully", success: true });
  } catch (err) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteTodos = async (req, res) => {
  const userId = req.user._id;
  const taskId = req.params.id;

  try {
    const deleted = await TodoModel.findOneAndDelete({
      _id: taskId,
      user: userId,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Todo not found or you don't have permission",
        success: false,
      });
    }

    return res
      .status(200)
      .json({ message: "Todo deleted successfully", success: true });
  } catch (err) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

const restoreTodo = async (req, res) => {
  try {
    const { task, completed, isEditing, user, createdAt, dueDate, _id } =
      req.body;
    const id = req.user._id;
    const existing = await TodoModel.findOne({ task: task, user: id });
    if (existing) {
      return res.status(400).json({
        message: "This task already exists in your list.",
        success: false,
      });
    }
    const newTodo = new TodoModel({
      task,
      user: id,
      completed,
      isEditing,
      user,
      createdAt,
      dueDate,
      _id,
    });
    await newTodo.save();
    res
      .status(201)
      .json({ message: "Task added successfully!", success: true, newTodo });
  } catch (err) {
    if (err.code === 11000) {
      // MongoDB duplicate key error (from unique index)
      return res.status(400).json({
        message: "This task already exists in your list.",
        success: false,
      });
    }
    res.status(500).json({ message: err.message, success: false });
  }
};

module.exports = { addTodos, getTodos, deleteTodos, editTodo, restoreTodo };
