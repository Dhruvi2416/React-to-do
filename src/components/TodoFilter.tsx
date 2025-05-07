import React from "react";

type TodoFilterProps = {
  onFilterChange: React.Dispatch<
    React.SetStateAction<"all" | "completed" | "pending">
  >;
  filterType: string;
  onSortByOldest: React.Dispatch<React.SetStateAction<boolean>>;
  sort: boolean;
};
const TodoFilter: React.FC<TodoFilterProps> = ({
  onFilterChange,
  filterType,
  onSortByOldest,
  sort,
}) => {
  return (
    <div className="flex gap-2">
      <div>
        <input
          checked={filterType === "completed"}
          id="completedTasks"
          type="checkbox"
          className="mr-1"
          onChange={() =>
            onFilterChange((prev) =>
              prev !== "completed" ? "completed" : "all"
            )
          }
        />
        <label htmlFor="completedTasks"> Completed tasks </label>
      </div>
      <div>
        <input
          checked={filterType === "pending"}
          id="pendingTasks"
          type="checkbox"
          className="mr-1"
          onChange={() =>
            onFilterChange((prev) => (prev !== "pending" ? "pending" : "all"))
          }
        />
        <label htmlFor="pendingTasks"> Pending tasks </label>
      </div>

      <div>
        <input
          checked={sort}
          id="sort"
          type="checkbox"
          className="mr-1"
          onChange={() => onSortByOldest((prev) => !prev)}
        />
        <label htmlFor="sort"> Sort tasks (Old first) </label>
      </div>
    </div>
  );
};

export default TodoFilter;
