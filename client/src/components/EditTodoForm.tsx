import React from "react";
import { useState } from "react";
import { TodoItem } from "../types";
import { useTodoContext } from "../providers/TodoProvider";

type EditTodoProps = {
  task: TodoItem;
  onEscEditTask: (id: string) => void;
};
const EditTodoForm: React.FC<EditTodoProps> = ({ task, onEscEditTask }) => {
  const { handleEditTodo } = useTodoContext();

  const [newTask, setNewTask] = useState(task.task);
  const [showError, setShowError] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onEscEditTask(task._id);
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
    handleEditTodo(task._id, newTask, false);
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
