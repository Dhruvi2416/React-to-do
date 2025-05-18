import { v4 as uuidv4 } from "uuid";
import React from "react";
import { useState } from "react";
import { useTodoContext } from "../providers/TodoProvider";
import { handleError } from "../helpers/util";

const AddTodo: React.FC = () => {
  const { setTodos, storeActionType } = useTodoContext();
  const [newTask, setNewTask] = useState("");
  const [showError, setShowError] = useState("");

  //handle Key Down Changes
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setNewTask("");
    }
  };

  // Add new todo
  const addTodos = async (todo: string) => {
    try {
      const url = `${import.meta.env.VITE_LINK}todos/add`;
      const token = localStorage.getItem("token") || "";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ task: todo.trim() }),
      });
      const result = await response.json();

      const { message, success } = result;

      if (success) {
        setTodos((prevTodos) => [result.newTodo, ...prevTodos]);

        //Log activity of add
        storeActionType("add", result.newTodo, true);
        setNewTask("");
      } else {
        handleError(message);
      }
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("Something went wrong");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //prevents default behaviour for form submit
    e.preventDefault();
    if (!newTask) {
      setShowError("Please enter a valid task");
      return;
    }
    setShowError("");
    addTodos(newTask);
  };

  return (
    <form className="AddTodo py-5" onSubmit={handleSubmit}>
      <div className="border-1 border-purple-500 flex justify-between">
        <input
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
          type="text"
          className="todo-input  p-2  focus:outline-none focus:ring-0 focus:border-transparent"
          placeholder="Add a new task"
          value={newTask}
          autoFocus
          //here value is needed as on emptying the todo it does not react explicitly as it is not binded
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="todo-btn">
          Add
        </button>
      </div>
      {showError ? <p className="error">{showError}</p> : <p></p>}
    </form>
  );
};

export default AddTodo;
