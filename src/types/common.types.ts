export interface Todo {
  id?: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
}

export interface AddTodoModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  todoToEdit?: Todo | null;
}