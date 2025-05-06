import DatePicker from "react-datepicker";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import { React, useState, useRef } from "react";

const DueDateSelector = ({ task, dueDateChange }) => {
  const [dueDate, setDueDate] = useState(task.dueDate);
  // const startRef = useRef(null);

  //Handle Due date change
  const onDateChange = (newDate) => {
    setDueDate(newDate);
    dueDateChange(task.id, newDate);
  };
  return (
    <div>
      {/* <label> */}
      <DatePicker
        // ref={startRef}
        selected={dueDate}
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
