import React from "react";
import { useState } from "react";
const TodoForm = ({ addTodo }) => {
  const [newTask, setNewTask] = useState("");
  const [showError, setShowError] = useState("");

  //handle Key Down Changes
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setNewTask("");
    }
  };

  const handleSubmit = (e) => {
    //prevents default behaviour for form submit
    e.preventDefault();
    if (!newTask) {
      setShowError("Please enter a valid task");
      return;
    }
    setShowError("");
    addTodo(newTask);
    setNewTask("");
  };
  return (
    <form className="TodoForm py-5" onSubmit={handleSubmit}>
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

export default TodoForm;
