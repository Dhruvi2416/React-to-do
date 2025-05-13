import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { TodoItem, LastActionType } from "../types";

type TodoContextType = {
  todos: TodoItem[];
  setTodos: Dispatch<SetStateAction<TodoItem[]>>;
  lastActions: LastActionType[];
  setLastActions: Dispatch<SetStateAction<LastActionType[]>>;
  handleEditTodo: (
    id: string,
    task: string,
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
    type: "add" | "edit" | "delete",
    task: TodoItem,
    storeInUndoStack: boolean,
    shouldEmptyRedo?: boolean
  ) => void;
};
const TodoContext = createContext<TodoContextType | null>(null);
const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<TodoItem[]>(() =>
    JSON.parse(localStorage.getItem("todosStored") || "[]")
  );
  const [lastActions, setLastActions] = useState<LastActionType[]>([]);
  const [redoActions, setRedoActions] = useState<LastActionType[]>([]);

  //Handle action type stored in undo stack
  const storeActionType = (
    type: "add" | "edit" | "delete",
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
      console.log("lastPerformedActions", lastPerformedActions);
      if (shouldEmptyRedo) {
        setRedoActions([]);
      }
    } else {
      setRedoActions((prevActions) => [
        ...prevActions,
        { type: type, performedOn: task },
      ]);
      console.log("REDO", redoActions);
    }
  };

  // Handle task edit
  const handleEditTodo = (
    id: string,
    task: string,
    actionPerformedByUndoRedo = false,
    isRedo: boolean = false
  ) => {
    const editTask = todos.find((todo) => todo.id === id);
    if (editTask) {
      storeActionType(
        "edit",
        editTask,
        !actionPerformedByUndoRedo ? true : isRedo ? true : false,
        !actionPerformedByUndoRedo
      );
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false, ...{ task } } : todo
      )
    );
  };

  // Delete task
  const handleDeleteTask = (
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
      //used find instead of filter a filter returns [] but we need {}
      const taskToBeDeleted = todos.find((todo) => todo.id === id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));

      if (taskToBeDeleted) {
        storeActionType(
          "delete",
          taskToBeDeleted,
          !actionPerformedByUndoRedo ? true : isRedo ? true : false,
          !actionPerformedByUndoRedo
        );
      }
    }
  };

  // Store todos in localStorage
  useEffect(() => {
    localStorage.setItem("todosStored", JSON.stringify(todos));
  }, [todos]);

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

export default TodoProvider;

// context/TodoContext.ts
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error("useTodoContext must be used within a TodoProvider");
  return context;
};
