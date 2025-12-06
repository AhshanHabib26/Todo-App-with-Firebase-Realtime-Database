import Container from "../utils/Container";

export default function AddTodo() {
  return (
    <Container>
      <div className="my-5 flex items-center justify-between">
        <input className="border border-gray-300 px-2 w-[250px] h-10 rounded-2xl outline-0" type="search" placeholder="Search here..." />
        <button className="bg-slate-900 px-4 py-2 text-white rounded cursor-pointer hover:bg-slate-950">
          Add Todo
        </button>
      </div>
    </Container>
  );
}
