import React, { useState, useEffect, useMemo } from "react";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import TodoFilter from "./TodoFilter";
import DueDateSelector from "./DueDateSelector";
import { TodoItem, LastActionType } from "../types";
import UndoTask from "./UndoRedoTaskButton";
import { useTodoContext } from "../providers/TodoProvider";

const TodoWrapper: React.FC = () => {
  const { todos, setTodos } = useTodoContext();

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

  // Toggle edit mode
  const handleOnClickEditTask = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <>
      <div className="TodoWrapper">
        <h1 className="text-5xl mt-3 flex justify-center align-items-center">
          Get Things Done!
        </h1>
        <AddTodo />
        <div className="todolist">
          {sortedAndFilteredTodos.map((todo, index) =>
            todo.isEditing ? (
              <EditTodoForm
                task={todo}
                key={todo.id}
                onEscEditTask={handleOnClickEditTask}
              />
            ) : (
              <div className="flex justify-between" key={todo.id}>
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
      </div>
    </>
  );
};

export default TodoWrapper;
