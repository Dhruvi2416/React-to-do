import React, { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import TodoFilter from "./TodoFilter";
import DueDateSelector from "./DueDateSelector";

export type TodoItem = {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  createdAt: number;
  dueDate: number;
};

const TodoWrapper: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>(() =>
    JSON.parse(localStorage.getItem("todosStored") || "[]")
  );
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

    const sortedTodos = sortByOldest
      ? [...filteredTodos].sort((a, b) => a.createdAt - b.createdAt)
      : [...filteredTodos].sort((a, b) => b.createdAt - a.createdAt);
    return sortedTodos;
  }, [todos, filterType, sortByOldest]);

  // Add new todo
  const addTodos = (todo: string) => {
    setTodos((prevTodos) => [
      {
        id: uuidv4(),
        task: todo,
        completed: false,
        isEditing: false,
        createdAt: Date.now(),
        dueDate: Date.now(),
      },
      ...prevTodos,
    ]);
  };

  // Toggle complete status
  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete task
  const handleDeleteTask = (id: string) => {
    if (window.confirm("Are you sure you want to delete the task?")) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  // Toggle edit mode
  const handleOnClickEditTask = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Handle task edit
  const handleEditTodo = (
    id: string,
    task: string,
    undoEdit: boolean = false
  ) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, isEditing: false, ...(undoEdit ? {} : { task }) }
          : todo
      )
    );
  };

  //Handle Due Date Change of a todo
  const handleDueDateChangeOFTodo = (id: string, newDueDate: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, dueDate: newDueDate } // Update the due date here
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
            <div className="flex justify-between" key={todo.id}>
              <div className="w-[95%]">
                <Todo
                  task={todo}
                  toggleComplete={toggleComplete}
                  deleteTask={handleDeleteTask}
                  onClickEditTask={handleOnClickEditTask}
                />
              </div>

              <div className="w-[5%]">
                <DueDateSelector
                  task={todo}
                  dueDateChange={handleDueDateChangeOFTodo}
                />
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
    </div>
  );
};

export default TodoWrapper;
