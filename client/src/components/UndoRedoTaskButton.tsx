import React from "react";
import { useTodoContext } from "../providers/TodoProvider";

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
  const handleUndoRedoTask = (isRedo = false) => {
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
            setTodos((prevTodos) => [task, ...prevTodos]);

            // //Log activity of delete
            storeActionType(
              "add",
              performedTask?.performedOn,
              isRedo ? true : false,
              false
            );

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
