import React, { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import TodoFilter from "./TodoFilter";

const TodoWrapper = () => {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todosStored")) || [];
  });
  const [filterType, setFilterType] = useState("all");
  const [sortByOldest, setSortByOldest] = useState(false);

  //sortedAndFilteredTodos
  const sortedAndFilteredTodos = useMemo(() => {
    let filteredTodos = todos;
    switch (filterType) {
      case "completed":
        filteredTodos = todos.filter((todo) => todo.completed);
        break;
      case "pending":
        filteredTodos = todos.filter((todo) => !todo.completed);
        break;
    }

    const sortedTodos = sortByOldest
      ? [...filteredTodos].sort((a, b) => a.createdAt - b.createdAt)
      : [...filteredTodos].sort((a, b) => b.createdAt - a.createdAt);
    return sortedTodos;
  }, [todos, filterType, sortByOldest]);

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
  const handleEditTodo = (id, task, undoEdit = false) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, isEditing: false, ...(undoEdit ? {} : { task }) }
          : todo
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
            <EditTodoForm task={todo} key={todo.id} editTodo={handleEditTodo} />
          ) : (
            <Todo
              className="p-5"
              task={todo}
              key={todo.id}
              toggleComplete={toggleComplete}
              deleteTask={handleDeleteTask}
              onClickEditTask={handleOnClickEditTask}
            />
          )
        )}
      </div>
      <TodoFilter
        onFilterChange={setFilterType}
        filterType={filterType}
        onSortByOldest={setSortByOldest}
        sort={sortByOldest}
      />
    </div>
  );
};

export default TodoWrapper;
