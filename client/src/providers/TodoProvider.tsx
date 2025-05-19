import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { TodoItem, LastActionType } from "../types";
import { handleError, handleSuccess } from "../helpers/util";

type TodoContextType = {
  todos: TodoItem[];
  setTodos: Dispatch<SetStateAction<TodoItem[]>>;
  lastActions: LastActionType[];
  setLastActions: Dispatch<SetStateAction<LastActionType[]>>;
  handleEditTodo: (
    id: string,
    updateField: string | boolean | Date,
    actionPerformedByUndoRedo?: boolean,
    isRedo?: boolean
  ) => void;
  handleDeleteTask: (
    id: string,
    actionPerformedByUndoRedo?: boolean,
    isRedo?: boolean
  ) => void;
  redoActions: LastActionType[];
  setRedoActions: Dispatch<SetStateAction<LastActionType[]>>;
  storeActionType: (
    type: "add" | "edit" | "delete" | "toggleComplete" | "changeDate",
    task: TodoItem,
    storeInUndoStack: boolean,
    shouldEmptyRedo?: boolean
  ) => void;
};
const TodoContext = createContext<TodoContextType | null>(null);
const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const [lastActions, setLastActions] = useState<LastActionType[]>([]);
  const [redoActions, setRedoActions] = useState<LastActionType[]>([]);

  //Handle action type stored in undo stack
  const storeActionType = (
    type: "add" | "edit" | "delete" | "toggleComplete" | "changeDate",
    task: TodoItem,
    storeInUndoStack: boolean,
    shouldEmptyRedo: boolean = true
  ) => {
    if (storeInUndoStack) {
      const lastPerformedActions = [
        ...lastActions.slice(-5),
        { type: type, performedOn: task },
      ];
      setLastActions(lastPerformedActions);
   
      if (shouldEmptyRedo) {
        setRedoActions([]);
      }
    } else {
      setRedoActions((prevActions) => [
        ...prevActions,
        { type: type, performedOn: task },
      ]);
      
    }
  };

  // Handle task edit
  const handleEditTodo = async (
    id: string,
    updateField: string | boolean | Date,
    actionPerformedByUndoRedo = false,
    isRedo: boolean = false
  ) => {
    try {
      const url = `${import.meta.env.VITE_LINK}todos/edit/${id}`;
      const token = localStorage.getItem("token") || "";
      const editTask = todos.find((todo) => todo._id === id);
   
      const editField: Partial<TodoItem> = {};
      if (typeof updateField === "string") editField.task = updateField;
      if (typeof updateField === "boolean") editField.completed = updateField;
      if (updateField instanceof Date) editField.dueDate = updateField;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ ...editField }),
      });
      const result = await response.json();
      const { message, success } = result;
    
      if (success && editTask) {
        let actionType = "edit";
        if (typeof updateField === "string") actionType = "edit";
        if (typeof updateField === "boolean") actionType = "toggleComplete";
        if (updateField instanceof Date) actionType = "changeDate";
        if (
          actionType === "edit" ||
          actionType === "toggleComplete" ||
          actionType === "changeDate"
        ) {
          storeActionType(
            actionType,
            editTask,
            !actionPerformedByUndoRedo ? true : isRedo ? true : false,
            !actionPerformedByUndoRedo
          );
        }
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === id ? { ...todo, isEditing: false, ...editField } : todo
          )
        );
      } else {
        handleError(message);
      }
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("Something went wrong for updating task");
      }
    }
  };

  // Delete task
  const handleDeleteTask = async (
    id: string,
    actionPerformedByUndoRedo = false,
    isRedo: boolean = false
  ) => {
    const permissionNeeded = actionPerformedByUndoRedo ? false : true;

    if (
      permissionNeeded
        ? window.confirm("Are you sure you want to delete the task?")
        : actionPerformedByUndoRedo
    ) {
      try {
        const url = `${import.meta.env.VITE_LINK}todos/delete/${id}`;
        const token = localStorage.getItem("token") || "";
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        });
        const result = await response.json();
        const { success, message } = result;
        if (success) {
          handleSuccess(message);
          //used find instead of filter a filter returns [] but we need {}
          const taskToBeDeleted = todos.find((todo) => todo._id === id);
          setTodos((prev) => prev.filter((todo) => todo._id !== id));

          if (taskToBeDeleted) {
            storeActionType(
              "delete",
              taskToBeDeleted,
              !actionPerformedByUndoRedo ? true : isRedo ? true : false,
              !actionPerformedByUndoRedo
            );
          }
        } else {
          handleError(message);
        }
      } catch (err) {
        if (err instanceof Error) {
          handleError(err.message);
        } else {
          handleError(
            "Task is not delete or you do not have permission to delete it!"
          );
        }
      }
    }
  };

  const fetchTodos = async () => {
    try {
      const url = `${import.meta.env.VITE_LINK}todos/`;
      const token = localStorage.getItem("token") || "";
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-type": "application/json", Authorization: token },
      });
      const result = await response.json();
     
      const { success, todos, message } = result;
      if (success) {
        setTodos(todos);
      } else {
        handleError(message);
      }
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("Something went Wrong");
      }
    }
  };
  // Store todos in localStorage
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        lastActions,
        setLastActions,
        handleEditTodo,
        handleDeleteTask,
        redoActions,
        setRedoActions,
        storeActionType,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// context/TodoContext.ts
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error("useTodoContext must be used within a TodoProvider");
  return context;
};
export { TodoProvider };
