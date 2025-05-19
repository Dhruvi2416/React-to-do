import DatePicker from "react-datepicker";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useRef } from "react";
import { TodoItem } from "../types";
import { useTodoContext } from "../providers/TodoProvider";
import { handleError } from "../helpers/util";

type DatePickerProps = {
  task: TodoItem;
};
const DueDateSelector: React.FC<DatePickerProps> = ({ task }) => {
  const { todos, setTodos, storeActionType, handleEditTodo } = useTodoContext();

  const [dueDate, setDueDate] = useState<Date>(task.dueDate);

  //Handle Due date change
  const onDateChange = (newDate: Date | null) => {
    if (newDate) {
      // const timestamp = newDate.getTime(); // Convert to timestamp (number)
      setDueDate(newDate); // Update state with timestamp
      handleDueDateChangeOfTodo(task._id, newDate); // Pass the timestamp to the parent component
    }
  };

  //Handle Due Date Change of a todo
  const handleDueDateChangeOfTodo = async (id: string, newDueDate: Date) => {
    // //Log activity of edit date
    const oldTask = todos.find((t) => t._id === id);
    if (!oldTask) return;
    handleEditTodo(id, newDueDate);
    // try {
    //   const url = `${import.meta.env.VITE_LINK}todos/edit/${id}`;
    //   const token = localStorage.getItem("token") || "";
    //   const response = await fetch(url, {
    //     method: "PUT",
    //     headers: {
    //       "Content-type": "application/json",
    //       Authorization: token,
    //     },
    //     body: JSON.stringify({ dueDate: newDueDate }),
    //   });

    //   const result = await response.json();
    //   const { success, message } = result;
    //   if (success) {
    //     setTodos((prev) =>
    //       prev.map((todo) =>
    //         todo._id === id
    //           ? { ...todo, dueDate: newDueDate } // Update the due date here
    //           : todo
    //       )
    //     );
    //   } else {
    //     handleError(message);
    //   }
    // } catch (err) {
    //   if (err instanceof Error) {
    //     handleError(err.message);
    //   } else {
    //     handleError("Something went wrong");
    //   }
    // }
  };

  return (
    <div>
      {/* <label> */}
      <DatePicker
        // ref={startRef}
        selected={new Date(task.dueDate)} // Convert the number (timestamp) to a Date object
        onChange={(e) => onDateChange(e)}
        dateFormat="dd/MM/yyyy"
        // toggleCalendarOnIconClick={false}
      />
      {/* <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => startRef.current?.setOpen(true)}
        /> */}
      {/* </label> */}
    </div>
  );
};

export default DueDateSelector;
