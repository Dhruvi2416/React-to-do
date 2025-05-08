import React from "react";

type undoProps = {
  undoTask: () => void;
};
const UndoTask: React.FC<undoProps> = ({undoTask}) => {
  return (
    <button
      type="button"
      className="m-2 p-2 text-black bg-white"
      onClick={() => undoTask()}
    >
      {" "}
      Undo{" "}
    </button>
  );
};

export default UndoTask;
