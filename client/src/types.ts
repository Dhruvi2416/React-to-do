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

export type SignUpInfo = {
  name: string;
  email: string;
  password: string;
};
export type LoginInfo = {
  email: string;
  password: string;
};
