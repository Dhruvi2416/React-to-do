import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
uuidv4();
const TodoWrapper = () => {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todosStored")) || [];
  });
  const addTodos = (todo) => {
    setTodos([
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
      ...todos,
    ]);

    //     State updates are batched and asynchronous:
    // When setTodos([...]) is called, React schedules the state change, but todos still holds the previous value until React processes the update.

    // Re-rendering happens after the function completes:
    // The state gets updated, but console.log(todos); runs before the component re-renders with the new state.
    //     console.log(todos);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete the task?")) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  useEffect(() => {
    localStorage.setItem("todosStored", JSON.stringify(todos));
  }, [todos]);

  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem("todosStored")) || [];
  //   setTodos(storedTodos);
  // }, []);
  const handleOnClickEditTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };
  const handleEditTodo = (id, task) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isEditing: !todo.isEditing, task: task }
          : todo
      )
    );
  };
  return (
    <div className="TodoWrapper">
      <h1 className="text-5xl mt-3 flex justify-center align-items-center">
        Get Things Done!
      </h1>
      <TodoForm addTodo={addTodos} />
      {todos.map((todo, index) => {
        return todo.isEditing ? (
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
        );
      })}
    </div>
  );
};

export default TodoWrapper;
