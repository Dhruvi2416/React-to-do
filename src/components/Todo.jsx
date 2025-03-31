import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task, toggleComplete, deleteTask, onClickEditTask }) => {
  return (
    <div className="Todo flex my-2 p-2 justify-between ">
      <div className="flex">
        <input
          type="checkbox"
          onChange={() => toggleComplete(task.id)}
          checked={task.completed}
        />
        <p
          title={task.task}
          className={`${
            task.completed ? "completed" : ""
          }  text-xl mx-2 max-w-[350px] truncate overflow-hidden whitespace-nowrap`}
        >
          {task.task}
        </p>
      </div>
      <div className="flex align-items-center justify-center">
        <FontAwesomeIcon
          className="p-2"
          icon={faPenToSquare}
          onClick={() => onClickEditTask(task.id)}
        />
        <FontAwesomeIcon
          className="p-2"
          icon={faTrash}
          onClick={() => deleteTask(task.id)}
        />
      </div>
    </div>
  );
};

export default Todo;
