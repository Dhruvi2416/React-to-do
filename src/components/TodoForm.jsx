import React from "react";
import { useState } from "react";
const TodoForm = ({ addTodo }) => {
  const [newTask, setNewTask] = useState("");
  const [showError, setShowError] = useState("");
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
    <form className="TodoForm" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          className="todo-input"
          placeholder="Add a new task"
          value={newTask}
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
