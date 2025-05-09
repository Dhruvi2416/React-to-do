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
            handleDeleteTask(performedTask?.performedOn?.id, true);

            const lastUndoActions = {
              type: "delete",
              performedOn: performedTask?.performedOn,
            };
            if (isRedo) {
              const lastPerformedActions = [
                ...lastActions.slice(-2),
                lastUndoActions,
              ];
              setLastActions(lastPerformedActions);
            } else {
              setRedoActions((prevActions) => [
                ...prevActions,
                lastUndoActions,
              ]);
            }
            break;
          }

          case "delete": {
            const task = performedTask.performedOn;
            setTodos((prevTodos) => [task, ...prevTodos]);
            const lastUndoActions = {
              type: "add",
              performedOn: performedTask?.performedOn,
            };

            if (isRedo) {
              const lastPerformedActions = [
                ...lastActions.slice(-2),
                lastUndoActions,
              ];
              setLastActions(lastPerformedActions);
            } else {
              setRedoActions((prevActions) => [
                ...prevActions,
                lastUndoActions,
              ]);
            }

            break;
          }

          case "edit": {
            handleEditTodo(
              performedTask?.performedOn?.id,
              performedTask?.performedOn?.task,
              true
            );
            const lastUndoActions = {
              type: "edit",
              performedOn: performedTask?.performedOn,
            };

            if (isRedo) {
              const lastPerformedActions = [
                ...lastActions.slice(-2),
                lastUndoActions,
              ];
              setLastActions(lastPerformedActions);
            } else {
              setRedoActions((prevActions) => [
                ...prevActions,
                lastUndoActions,
              ]);
            }
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
        className="m-2 p-2 text-black bg-white"
        onClick={() => handleUndoRedoTask()}
      >
        {" "}
        Undo{" "}
      </button>
      <button
        type="button"
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
