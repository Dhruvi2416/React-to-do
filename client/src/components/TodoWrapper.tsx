import React, { useState, useEffect, useMemo } from "react";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import TodoFilter from "./TodoFilter";
import DueDateSelector from "./DueDateSelector";
import { TodoItem, LastActionType } from "../types";
import UndoTask from "./UndoRedoTaskButton";
import { useTodoContext } from "../providers/TodoProvider";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../helpers/util";
import { useUserContext } from "../providers/UserProvider";

const TodoWrapper: React.FC = () => {
  const navigate = useNavigate();

  const { todos, setTodos } = useTodoContext();
  const { user, setUser } = useUserContext();
  const [filterType, setFilterType] = useState<"all" | "pending" | "completed">(
    "all"
  );
  const [sortByOldest, setSortByOldest] = useState<boolean>(false);

  //sortedAndFilteredTodos
  const sortedAndFilteredTodos = useMemo<TodoItem[]>(() => {
    let filteredTodos = todos;
    switch (filterType) {
      case "completed":
        filteredTodos = todos.filter((todo) => todo.completed);
        break;
      case "pending":
        filteredTodos = todos.filter((todo) => !todo.completed);
        break;
    }
    console.log("filteredTodos", filteredTodos);
    const sortedTodos = sortByOldest
      ? [...filteredTodos].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      : [...filteredTodos].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    return sortedTodos;
  }, [todos, filterType, sortByOldest]);

  // Toggle edit mode
  const handleOnClickEditTask = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged Out Successfully!");
    setUser("");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("loggedInUser") || "";
    setUser(userLoggedIn);
  }, []);
  return (
    <>
      <div className="TodoWrapper">
        <h1 className="text-2xl mt-3 flex justify-center align-items-center">
          Hello {user}, Here are your tasks!
        </h1>
        <AddTodo />
        <div className="todolist">
          {sortedAndFilteredTodos.map((todo, index) =>
            todo.isEditing ? (
              <EditTodoForm
                task={todo}
                key={todo._id}
                onEscEditTask={handleOnClickEditTask}
              />
            ) : (
              <div className="flex justify-between" key={todo._id}>
                <div className="w-[95%]">
                  <Todo task={todo} onClickEditTask={handleOnClickEditTask} />
                </div>

                <div className="w-[5%]">
                  <DueDateSelector task={todo} />
                </div>
              </div>
            )
          )}
        </div>
        <TodoFilter
          onFilterChange={setFilterType}
          filterType={filterType}
          onSortByOldest={setSortByOldest}
          sort={sortByOldest}
        />
        <UndoTask />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default TodoWrapper;
