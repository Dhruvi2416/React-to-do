import { React, memo } from "react";

const search = ({ searchTerm, handleSearchFunction }) => {
  console.log("SEARCH COMPOENNT YAY!!!");
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => handleSearchFunction(e.target.value)}
      />
    </div>
  );
};

export default memo(search);
