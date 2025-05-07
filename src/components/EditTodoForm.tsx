import React from "react";
import { useState } from "react";
import { TodoItem } from "../types";

type EditTodoProps = {
  editTodo: (id: string, task: string, undoEdit: boolean) => void;
  task: TodoItem;
};
const EditTodoForm: React.FC<EditTodoProps> = ({ editTodo, task }) => {
  const [newTask, setNewTask] = useState(task.task);
  const [showError, setShowError] = useState("");
  const [undoEdit, setUndoEdit] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      const undoEditedTask = !undoEdit;
      setUndoEdit((prev) => !prev);
      editTodo(task.id, newTask, undoEditedTask);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //prevents default behaviour for form submit
    e.preventDefault();
    if (!newTask) {
      setShowError("Please enter a valid task");
      return;
    }
    setShowError("");
    editTodo(task.id, newTask, true);
    setNewTask("");
  };
  return (
    <form className="EditTodoForm py-2 " onSubmit={handleSubmit}>
      <div className="border-1 border-purple-500 flex justify-between">
        <input
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
          type="text"
          className="todo-input p-2  focus:outline-none focus:ring-0 focus:border-transparent"
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
