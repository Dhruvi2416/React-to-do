import { React, memo, useContext } from "react";
import { SearchTermContext } from "./Callback";

const search = () => {
  console.log("SEARCH COMPOENNT YAY!!!");
  const { searchTerm: searchTerms, handleSearchTermChange } =
    useContext(SearchTermContext);
  console.log("SSSS", searchTerms);
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerms}
        onChange={(e) => handleSearchTermChange(e.target.value)}
      />
      Searchterms: {searchTerms}
    </div>
  );
};

export default memo(search);
