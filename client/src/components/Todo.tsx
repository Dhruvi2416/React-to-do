import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { TodoItem } from "../types";
import { useTodoContext } from "../providers/TodoProvider";

type TodoProps = {
  task: TodoItem;
  onClickEditTask: (id: string) => void;
  className?: string;
};
const Todo: React.FC<TodoProps> = ({
  task,
  onClickEditTask,
  className = "",
}) => {
  const { todos, setTodos, handleDeleteTask } = useTodoContext();

  //check if the task is expired
  const isTaskExpired = () => {
    const currentDate = moment().startOf("day");
    const dueDate = moment(task.dueDate).startOf("day");
    return dueDate.isBefore(currentDate);
  };
  // Toggle complete status
  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className={`Todo flex my-2 p-2 justify-between ${className}`}>
      <div className="flex">
        <input
          type="checkbox"
          style={{
            marginTop: -20,
          }}
          onChange={() => toggleComplete(task._id)}
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
          <p
            className={`${
              task.completed ? "" : isTaskExpired() ? "taskexpired" : ""
            } mx-2`}
          >
            Due Date: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex align-items-center justify-center">
        <FontAwesomeIcon
          className="p-2"
          icon={faPenToSquare}
          onClick={() => onClickEditTask(task._id)}
        />
        <FontAwesomeIcon
          className="p-2"
          icon={faTrash}
          onClick={() => handleDeleteTask(task._id)}
        />
      </div>
    </div>
  );
};

export default Todo;
