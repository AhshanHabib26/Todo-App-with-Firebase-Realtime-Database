/* eslint-disable @typescript-eslint/no-explicit-any */
import app from "@/firebase.config";
import Container from "@/utils/Container";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

export default function GetTodos() {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    const db = getDatabase(app);
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

    // cleanup
    return () => unsubscribe();
  }, []);

  console.log(todos);

  return (
    <div>
      <Container>
        <div>
          <h2 className="text-xl font-bold mb-4">Your Todos:</h2>
          <div>
            {todos.length === 0 ? (
              <p>No todos available.</p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="border border-black rounded-md m-2 p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{todo.title}</h3>

                    <div className="flex gap-2">
                      {/* Priority Badge */}
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${
                          todo.priority === "low"
                            ? "bg-green-100 text-green-800"
                            : todo.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {todo.priority}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${
                          todo.status === "pending"
                            ? "bg-gray-100 text-gray-800"
                            : todo.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-200 text-green-900"
                        }`}
                      >
                        {todo.status}
                      </span>
                    </div>
                  </div>

                  <p
                    className={
                      todo.status === "completed" ? "line-through" : ""
                    }
                  >
                    {todo.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
