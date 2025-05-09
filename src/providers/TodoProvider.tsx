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
    actionPerformedByUndoing: boolean
  ) => void;
  handleDeleteTask: (id: string, actionPerformedByUndoing?: boolean) => void;
  redoActions: LastActionType[];
  setRedoActions: Dispatch<SetStateAction<LastActionType[]>>;
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
  // Handle task edit
  const handleEditTodo = (
    id: string,
    task: string,
    actionPerformedByUndoing = false
  ) => {
    if (!actionPerformedByUndoing) {
      const editTask = todos.find((todo) => todo.id === id);
      if (editTask) {
        const lastPerformedActions = [
          ...lastActions.slice(-2),
          { type: "edit", performedOn: editTask },
        ];
        setLastActions(lastPerformedActions);
        setRedoActions([]);
      }
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false, ...{ task } } : todo
      )
    );
  };

  // Delete task
  const handleDeleteTask = (id: string, actionPerformedByUndoing = false) => {
    if (window.confirm("Are you sure you want to delete the task?")) {
      //used find instead of filter a sfilter returns [] but we need {}
      const taskToBeDeleted = todos.find((todo) => todo.id === id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));

      if (!actionPerformedByUndoing && taskToBeDeleted) {
        const lastPerformedActions = [
          ...lastActions.slice(-2),
          { type: "delete", performedOn: taskToBeDeleted },
        ];
        setLastActions(lastPerformedActions);
        setRedoActions([]);
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
