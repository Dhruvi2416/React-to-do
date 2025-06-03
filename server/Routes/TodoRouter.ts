const {
  addTodos,
  getTodos,
  deleteTodos,
  editTodo,
  restoreTodo,
} = require("../Controllers/TodoController");
const { ensureAuthenticated } = require("../Middlewares/AuthValidate");
const {
  TodoValidation,
  RestoreTodoValidation,
} = require("../Middlewares/TodoValidate");

const todoRouter = require("express").Router();

todoRouter.get("/", ensureAuthenticated, TodoValidation, getTodos);
todoRouter.post("/add", ensureAuthenticated, TodoValidation, addTodos);
todoRouter.post(
  "/restore/:id",
  ensureAuthenticated,
  RestoreTodoValidation,
  restoreTodo
);
todoRouter.put("/edit/:id", ensureAuthenticated, editTodo);
todoRouter.delete("/delete/:id", ensureAuthenticated, deleteTodos);
module.exports = todoRouter;
