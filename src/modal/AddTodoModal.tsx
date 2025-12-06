import { useState, useEffect, startTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDatabase, ref, set, update } from "firebase/database";
import { toast } from "sonner";
import type { AddTodoModalProps, Todo } from "@/types/common.types";

export function AddTodoModal({
  openModal,
  setOpenModal,
  todoToEdit,
}: AddTodoModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Todo["status"]>("pending");
  const [priority, setPriority] = useState<Todo["priority"]>("low");

  // Safe state update in useEffect using startTransition
  useEffect(() => {
    startTransition(() => {
      if (todoToEdit) {
        setTitle(todoToEdit.title);
        setDescription(todoToEdit.description);
        setStatus(todoToEdit.status);
        setPriority(todoToEdit.priority);
      } else {
        setTitle("");
        setDescription("");
        setStatus("pending");
        setPriority("low");
      }
    });
  }, [todoToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const db = getDatabase();

    const newTodo = { title, description, status, priority };

    try {
      if (todoToEdit && todoToEdit.id) {
        // Update existing todo
        await update(ref(db, "todos/" + todoToEdit.id), newTodo);
        toast.success("Todo updated successfully!");
      } else {
        // Create new todo
        const todoId = Date.now();
        await set(ref(db, "todos/" + todoId), newTodo);
        toast.success("Todo added successfully!");
      }

      setOpenModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save todo.");
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="max-w-xs md:max-w-lg z-99999">
        <DialogHeader>
          <DialogTitle>{todoToEdit ? "Edit Todo" : "Add Todo"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Todo Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              required
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Todo Description</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              required
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Status */}
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select
                value={status}
                onValueChange={(val) => setStatus(val as Todo["status"])}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="z-100000">
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div>
              <label className="text-sm font-medium">Priority</label>
              <Select
                value={priority}
                onValueChange={(val) => setPriority(val as Todo["priority"])}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="z-100000">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{todoToEdit ? "Update" : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
