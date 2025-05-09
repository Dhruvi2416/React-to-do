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
};
const TodoContext = createContext<TodoContextType | null>(null);
const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<TodoItem[]>(() =>
    JSON.parse(localStorage.getItem("todosStored") || "[]")
  );
  const [lastActions, setLastActions] = useState<LastActionType[]>([]);

  // Store todos in localStorage
  useEffect(() => {
    localStorage.setItem("todosStored", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, lastActions, setLastActions }}
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
