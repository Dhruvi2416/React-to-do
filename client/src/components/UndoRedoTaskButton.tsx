import React from "react";
import { useTodoContext } from "../providers/TodoProvider";
import { handleError } from "../helpers/util";

const UndoTask: React.FC = () => {
  const {
    todos,
    setTodos,
    lastActions,
    setLastActions,
    handleEditTodo,
    handleDeleteTask,
    redoActions,
    setRedoActions,
    storeActionType,
  } = useTodoContext();

  //handle undo task
  const handleUndoRedoTask = async (isRedo = false) => {
    if (lastActions.length || redoActions.length) {
      let performedTask;
      if (isRedo) {
        performedTask = redoActions.pop();
      } else {
        performedTask = lastActions.pop();
      }
      if (performedTask && performedTask.performedOn) {
        switch (performedTask?.type) {
          case "add": {
            handleDeleteTask(performedTask?.performedOn?._id, true, isRedo);

            break;
          }

          case "delete": {
            const task = performedTask.performedOn;
            try {
              const url = `${import.meta.env.VITE_LINK}todos/restore/${
                performedTask?.performedOn?._id
              }`;
              const token = localStorage.getItem("token") || "";
              const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify(task),
              });
              const result = await response.json();
            
              const { success, message, newTodo } = result;
              if (success) {
                setTodos((prevTodos) => [newTodo, ...prevTodos]);

                // //Log activity of delete
                storeActionType(
                  "add",
                  performedTask?.performedOn,
                  isRedo ? true : false,
                  false
                );
              } else {
                handleError(message);
              }
            } catch (err) {
              if (err instanceof Error) {
                handleError(err.message);
              } else {
                handleError(
                  "Something went wrong OR you don't have Permission."
                );
              }
            }

            break;
          }

          case "edit": {
            handleEditTodo(
              performedTask?.performedOn?._id,
              performedTask?.performedOn?.task,
              true,
              isRedo
            );

            break;
          }
          case "toggleComplete": {
            handleEditTodo(
              performedTask?.performedOn?._id,
              performedTask?.performedOn?.completed,
              true,
              isRedo
            );

            break;
          }
          case "changeDate": {
            if (
              performedTask.performedOn?.dueDate &&
              typeof performedTask.performedOn.dueDate === "string"
            ) {
              performedTask.performedOn.dueDate = new Date(
                performedTask.performedOn.dueDate
              );
            }

            handleEditTodo(
              performedTask?.performedOn?._id,
              performedTask?.performedOn?.dueDate,
              true,
              isRedo
            );

            break;
          }
        }
      }
    }
  };

  return (
    <div className="flex justify-center">
      <button
        type="button"
        disabled={lastActions.length === 0}
        className="m-2 p-2 text-black bg-white"
        onClick={() => handleUndoRedoTask()}
      >
        {" "}
        Undo{" "}
      </button>
      <button
        type="button"
        disabled={redoActions.length === 0}
        className="m-2 p-2 text-black bg-white"
        onClick={() => handleUndoRedoTask(true)}
      >
        {" "}
        Redo{" "}
      </button>
    </div>
  );
};

export default UndoTask;
