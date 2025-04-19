import React from "react";
import Search from "./search";
import { useState, useCallback } from "react";

const Callback = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [number, setNumber] = useState(0);

  //Handle search tern change with simple function
  // const handleSearchTermChange = (newTerm) => {
  //   setSearchTerm(newTerm);
  // };

  //Handle search term change with useCallback and no depndancy array as it only sets new state but not actual searchterm is needed here
  const handleSearchTermChange = useCallback((newTerm) => {
    setSearchTerm(newTerm);
  }, []);

  //Handle search term with useCallback with dependancy array of searchTerm because it is used inside the function
  // const handleSearchTermChange = useCallback((newTerm) => {
  //   console.log("SEARCH TERM CHANGED", searchTerm);
  //   setSearchTerm(newTerm);
  // }, []);

  return (
    <div>
      <button onClick={() => setNumber((prev) => prev + 1)}>Click me</button>
      <h1>{number}</h1>
      <Search
        searchTerm={searchTerm}
        handleSearchFunction={handleSearchTermChange}
      />
      {searchTerm}
    </div>
  );
};

export default Callback;
