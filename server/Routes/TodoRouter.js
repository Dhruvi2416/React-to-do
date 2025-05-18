const {
  addTodos,
  getTodos,
  deleteTodos,
  editTodo,
} = require("../Controllers/TodoController");
const { ensureAuthenticated } = require("../Middlewares/AuthValidate");
const TodoValidation = require("../Middlewares/TodoValidate");

const router = require("express").Router();

router.get("/", ensureAuthenticated, TodoValidation, getTodos);
router.post("/add", ensureAuthenticated, TodoValidation, addTodos);
router.put("/edit/:id", ensureAuthenticated, TodoValidation, editTodo);
router.delete("/delete/:id", ensureAuthenticated, deleteTodos);
module.exports = router;
