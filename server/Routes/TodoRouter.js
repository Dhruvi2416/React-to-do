const {
  addTodos,
  getTodos,
  deleteTodos,
  editTodo,
  restoreTodo,
} = require("../Controllers/TodoController");
const { ensureAuthenticated } = require("../Middlewares/AuthValidate");
const {TodoValidation, RestoreTodoValidation} = require("../Middlewares/TodoValidate");

const router = require("express").Router();

router.get("/", ensureAuthenticated, TodoValidation, getTodos);
router.post("/add", ensureAuthenticated, TodoValidation, addTodos);
router.post("/restore/:id",ensureAuthenticated,RestoreTodoValidation,restoreTodo)
router.put("/edit/:id", ensureAuthenticated, editTodo);
router.delete("/delete/:id", ensureAuthenticated, deleteTodos);
module.exports = router;
