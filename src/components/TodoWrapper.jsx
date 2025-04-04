import React, { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

const TodoWrapper = () => {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todosStored")) || [];
  });

  const [filterType, setFilterType] = useState("all");
  const [showOldestTodosFirst, setShowOldestTodosFirst] = useState(false);

  // Filter and sort todos
  const sortedAndFilteredTodos = useMemo(() => {
    const filtered = (() => {
      switch (filterType) {
        case "completed":
          return todos.filter((todo) => todo.completed);
        case "incomplete":
          return todos.filter((todo) => !todo.completed);
        default:
          return todos;
      }
    })();

    return [...filtered].sort((a, b) =>
      showOldestTodosFirst
        ? a.createdAt - b.createdAt
        : b.createdAt - a.createdAt
    );
  }, [todos, filterType, showOldestTodosFirst]);

  // Add new todo
  const addTodos = (todo) => {
    setTodos((prevTodos) => [
      {
        id: uuidv4(),
        task: todo,
        completed: false,
        isEditing: false,
        createdAt: Date.now(),
      },
      ...prevTodos,
    ]);
  };

  // Toggle complete status
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete task
  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete the task?")) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  // Toggle edit mode
  const handleOnClickEditTask = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Handle task edit
  const handleEditTodo = (id, task) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false, task } : todo
      )
    );
  };

  // Store todos in localStorage
  useEffect(() => {
    localStorage.setItem("todosStored", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="TodoWrapper">
      <h1 className="text-5xl mt-3 flex justify-center align-items-center">
        Get Things Done!
      </h1>
      <TodoForm addTodo={addTodos} />
      <div className="todolist">
        {sortedAndFilteredTodos.map((todo, index) =>
          todo.isEditing ? (
            <EditTodoForm task={todo} key={index} editTodo={handleEditTodo} />
          ) : (
            <Todo
              className="p-5"
              task={todo}
              key={index}
              toggleComplete={toggleComplete}
              deleteTask={handleDeleteTask}
              onClickEditTask={handleOnClickEditTask}
            />
          )
        )}
      </div>

      <div className="flex justify-center align-items-center mt-5">
        {/* Show Completed Tasks */}
        <div className="mx-2">
          <input
            type="checkbox"
            id="completed"
            checked={filterType === "completed"}
            onChange={() =>
              setFilterType((prev) =>
                prev === "completed" ? "all" : "completed"
              )
            }
          />
          <label htmlFor="completed"> Show Completed tasks</label>
        </div>

        {/* Show Pending Tasks */}
        <div className="mx-2">
          <input
            type="checkbox"
            id="pending"
            checked={filterType === "incomplete"}
            onChange={() =>
              setFilterType((prev) =>
                prev === "incomplete" ? "all" : "incomplete"
              )
            }
          />
          <label htmlFor="pending"> Show Pending tasks</label>
        </div>

        {/* Sort By Oldest */}
        <div>
          <input
            type="checkbox"
            id="sortByOldest"
            checked={showOldestTodosFirst}
            onChange={() => setShowOldestTodosFirst((prev) => !prev)}
          />
          <label htmlFor="sortByOldest"> Show Oldest tasks first</label>
        </div>
      </div>
    </div>
  );
};

export default TodoWrapper;
