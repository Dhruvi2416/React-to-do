import React from "react";
import Search from "./search";
import { useState, useCallback, createContext, useMemo } from "react";

export const SearchTermContext = createContext({
  searchTermOfContext: "",
  setSearchTermOfContext: () => {},
});
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

  //to memoize the context value this ios needed bcoz even when button is clicked child re-renders bcoz it recieves new object as a prop everytime. To ensure it gets same object memoize the object.
  const contextValue = useMemo(
    () => ({
      searchTerm,
      handleSearchTermChange,
    }),
    [searchTerm, handleSearchTermChange]
  );

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
      <SearchTermContext.Provider value={contextValue}>
        <Search />
      </SearchTermContext.Provider>
      {searchTerm}
    </div>
  );
};

export default Callback;

// key notes which i got here:

// 1. If I don't give any <searchContext.provider than only it will use default value
// Or else if you do not give value prop you will get undefined

// 2. If you give value prop to the provider then it will override the default value
// 3.No matter what name have written inside the createContext in value you have to give a state name.
// 4.  <SearchTermContext.Provider value={{ searchTerm, number }}> on changing value in search it will throw an error setSearchTerm is not a function

// 5. When you destructuree the name it should be exactly the same as it was passed in value

// the reason searchTerms in search works is bcoz first the search word is initialized with undefined
// but it sets the searchterms undefined for input tag its ''. but when function name is different it will throw error bcoz undefined() throws an error

// Even though I used searchTerms a different name in child component still input tag worked fine why?

// So why does it seem like it works?
// Because when the input is "uncontrolled" or partially controlled, React kind of lets it go with the flow:

// The input lets you type (it stores value internally in the DOM)

// But it’s not controlled by React state

// The React tree isn’t updating the input value — the DOM is just behaving like a regular text box

// You’ll notice:

// No re-rendered updates based on state

// The input might reset weirdly on hot reload or rerender

// React will throw a controlled/uncontrolled warning in some cases (but not always)

// If you want to use your own name than
// const { searchTerm: searchTerms, handleSearchTermChange } =
//     useContext(SearchTermContext);

//memoized the context value bcoz on every re-render new object will be passed and no point of memo than.

//also useCallback is necessary bcoz usemmeo has function as its dependancy

//if don't want to usecallback
// You can define the handleSearchTermChange function inside useMemo itself, and it will work just fine without needing useCallback. The function will be recreated only when searchTerm changes, and the context will be properly memoized.
