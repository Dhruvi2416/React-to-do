import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task, toggleComplete, deleteTask, onClickEditTask }) => {
  return (
    <div className="Todo">
      <input
        type="checkbox"
        onChange={() => toggleComplete(task.id)}
        checked={task.completed}
      />
      <p className={task.completed ? "completed" : ""}>{task.task}</p>

      <FontAwesomeIcon
        icon={faPenToSquare}
        onClick={() => onClickEditTask(task.id)}
      />
      <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(task.id)} />
    </div>
  );
};

export default Todo;
