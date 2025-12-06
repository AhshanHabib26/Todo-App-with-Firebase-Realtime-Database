/* eslint-disable @typescript-eslint/no-explicit-any */
import app from "@/firebase.config";
import Container from "@/utils/Container";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AddTodoModal } from "@/modal/AddTodoModal";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { VscEmptyWindow } from "react-icons/vsc";

export default function GetTodos() {
  const [todos, setTodos] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<any | null>(null);
  const db = getDatabase(app);

  useEffect(() => {
    const todoRef = ref(db, "todos/");
    const unsubscribe = onValue(todoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataRefactored = Object.entries(data).map(
          ([key, value]: [string, any]) => ({
            id: key,
            ...value,
          })
        );
        setTodos(dataRefactored);
      } else {
        setTodos([]);
      }
    });

    return () => unsubscribe();
  }, [db]);

  const handleDelete = async (id: string) => {
    try {
      await remove(ref(db, `todos/${id}`));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete todo.");
    }
  };

  const handleEdit = (todo: any) => {
    setTodoToEdit(todo);
    setModalOpen(true);
  };

  return (
    <div>
      <Container>
        <h2 className="text-xl font-bold mb-4">
          Todos List: <span className="text-green-600 font-bold">{todos.length || 0}</span>
        </h2>
        <div>
          {todos.length === 0 ? (
            <div className="flex items-center justify-between flex-col mt-16">
              <VscEmptyWindow size={48} className="text-gray-300" />
              <p className="text-xl font-thin italic text-gray-300">
                No todos available.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="border border-gray-200 shadow-md rounded-md p-4"
                >
                  <div>
                    <div>
                      <h3
                        className={`text-lg font-semibold ${
                          todo.status === "completed"
                            ? "line-through text-red-400"
                            : ""
                        }`}
                      >
                        {todo.title}
                      </h3>

                      <p
                        className={
                          todo.status === "completed"
                            ? "line-through text-red-400"
                            : ""
                        }
                      >
                        {todo.description}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        {/* Priority Badge */}
                        <span
                          className={`px-3 py-1 rounded text-sm font-semibold ${
                            todo.priority === "low"
                              ? "bg-green-200 text-green-800"
                              : todo.priority === "medium"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {todo.priority}
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`px-3 py-1 rounded text-sm font-semibold ${
                            todo.status === "pending"
                              ? "bg-gray-200 text-gray-800"
                              : todo.status === "in-progress"
                              ? "bg-blue-200 text-blue-800"
                              : "bg-green-200 text-green-900"
                          }`}
                        >
                          {todo.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Edit Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(todo)}
                        >
                          <FaRegPenToSquare className="mr-1" /> Edit
                        </Button>

                        {/* Delete Button */}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(todo.id)}
                        >
                          <FaRegTrashAlt className="mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* Edit Modal */}
      <AddTodoModal
        openModal={modalOpen}
        setOpenModal={setModalOpen}
        todoToEdit={todoToEdit}
      />
    </div>
  );
}
