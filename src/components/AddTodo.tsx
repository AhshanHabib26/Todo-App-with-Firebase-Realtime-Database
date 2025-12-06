import { useState } from "react";
import Container from "../utils/Container";
import { AddTodoModal } from "@/modal/AddTodoModal";

export default function AddTodo() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Container>
        <div className="flex items-center justify-between mt-4">
          <h2 className="text-xl font-bold">All Todos</h2>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-slate-900 px-4 py-2 text-white rounded cursor-pointer hover:bg-slate-950"
          >
            Add Todo
          </button>
        </div>
      </Container>
      {openModal && (
        <AddTodoModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}
