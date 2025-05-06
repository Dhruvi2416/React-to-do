import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const Todo = ({ task, toggleComplete, deleteTask, onClickEditTask }) => {
  //check if the task is expired
  const isTaskExpired = () => {
    const currentDate = moment().startOf("day");
    const dueDate = moment(task.dueDate).startOf("day");
    return dueDate.isBefore(currentDate);
  };

  return (
    <div className="Todo flex my-2 p-2 justify-between ">
      <div className="flex">
        <input
          type="checkbox"
          style={{
            marginTop: -20,
          }}
          onChange={() => toggleComplete(task.id)}
          checked={task.completed}
        />
        <div>
          <p
            title={task.task}
            className={`${
              task.completed
                ? "completed"
                : isTaskExpired()
                ? "taskexpired"
                : ""
            }  text-xl mx-2 max-w-[320px] truncate overflow-hidden whitespace-nowrap`}
          >
            {task.task}
          </p>
          <p className={`${isTaskExpired() ? "taskexpired" : ""} mx-2`}>
            Due Date: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        </div>
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
