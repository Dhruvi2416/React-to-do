import React from "react";
import { useState } from "react";
const EditTodoForm = ({ editTodo, task }) => {
  const [newTask, setNewTask] = useState(task.task);
  const [showError, setShowError] = useState("");
  const handleSubmit = (e) => {
    //prevents default behaviour for form submit
    e.preventDefault();
    if (!newTask) {
      setShowError("Please enter a valid task");
      return;
    }
    setShowError("");
    editTodo(task.id, newTask);
    setNewTask("");
  };
  return (
    <form className="EditTodoForm" onSubmit={handleSubmit}>
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
          Update
        </button>
      </div>
      {showError ? <p className="error">{showError}</p> : <p></p>}
    </form>
  );
};

export default EditTodoForm;
