export type TodoItem = {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  createdAt: number;
  dueDate: number;
};

export type LastActionType = {
  type: string;
  performedOn: TodoItem;
};
