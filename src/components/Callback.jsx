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
  //   When the useCallback is created, it captures the current value of searchTerm at that moment (from the surrounding scope).
  // Since your dependency array is [] (empty), the callback is memoized once — and never updated again.
  // So even if searchTerm changes in the future, the handleSearchTermChange will still be referencing the stale/old value of searchTerm.

  // const handleSearchTermChange = useCallback((newTerm) => {
  //   console.log("SEARCH TERM CHANGED", searchTerm);
  //   setSearchTerm(newTerm);
  // }, [searchTerm]);

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
