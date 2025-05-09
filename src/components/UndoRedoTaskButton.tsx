import React from "react";

type undoProps = {
  undoTask: () => void;
};
const UndoTask: React.FC<undoProps> = ({undoTask}) => {
  return<div className="flex justify-center">
    <button
      type="button"
      className="m-2 p-2 text-black bg-white"
      onClick={() => undoTask()}
    >
      {" "}
      Undo{" "}
    </button>
    <button
      type="button"
      className="m-2 p-2 text-black bg-white"
      onClick={() => redoTask()}
    >
      {" "}
      Redo{" "}
    </button>
  </div> 
  
};

export default UndoTask;
