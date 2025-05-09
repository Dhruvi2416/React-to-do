import { v4 as uuidv4 } from "uuid";
import React from "react";
import { useState } from "react";
import { useTodoContext } from "../providers/TodoProvider";

const AddTodo: React.FC = () => {
  const {
    todos,
    setTodos,
    lastActions,
    setLastActions,
    redoActions,
    setRedoActions,
  } = useTodoContext();
  const [newTask, setNewTask] = useState("");
  const [showError, setShowError] = useState("");

  //handle Key Down Changes
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setNewTask("");
    }
  };

  // Add new todo
  const addTodos = (todo: string) => {
    const newTodo = {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
      createdAt: Date.now(),
      dueDate: Date.now(),
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);

    const lastPerformedActions = [
      ...lastActions.slice(-2),
      { type: "add", performedOn: newTodo },
    ];
    setLastActions(lastPerformedActions);
    setRedoActions([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //prevents default behaviour for form submit
    e.preventDefault();
    if (!newTask) {
      setShowError("Please enter a valid task");
      return;
    }
    setShowError("");
    addTodos(newTask);
    setNewTask("");
  };

  return (
    <form className="AddTodo py-5" onSubmit={handleSubmit}>
      <div className="border-1 border-purple-500 flex justify-between">
        <input
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
          type="text"
          className="todo-input  p-2  focus:outline-none focus:ring-0 focus:border-transparent"
          placeholder="Add a new task"
          value={newTask}
          autoFocus
          //here value is needed as on emptying the todo it does not react explicitly as it is not binded
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="todo-btn">
          Add
        </button>
      </div>
      {showError ? <p className="error">{showError}</p> : <p></p>}
    </form>
  );
};

export default AddTodo;
