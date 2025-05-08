export type TodoItem = {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  createdAt: number;
  dueDate: number;
};

export type lastActionType = {
  type?: string;
  performedOn?: TodoItem;
};
