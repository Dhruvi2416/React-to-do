import DatePicker from "react-datepicker";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useRef } from "react";
import { TodoItem } from "../types";

type DatePickerProps = {
  task: TodoItem;
  dueDateChange: (id: string, newDate: number) => void;
};
const DueDateSelector: React.FC<DatePickerProps> = ({
  task,
  dueDateChange,
}) => {
  const [dueDate, setDueDate] = useState<number>(task.dueDate);
  // const startRef = useRef(null);

  //Handle Due date change
  const onDateChange = (newDate: Date | null) => {
    if (newDate) {
      const timestamp = newDate.getTime(); // Convert to timestamp (number)
      setDueDate(timestamp); // Update state with timestamp
      dueDateChange(task.id, timestamp); // Pass the timestamp to the parent component
    }
  };
  return (
    <div>
      {/* <label> */}
      <DatePicker
        // ref={startRef}
        selected={new Date(dueDate)} // Convert the number (timestamp) to a Date object
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
