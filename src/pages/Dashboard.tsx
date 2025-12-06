import AddTodo from "../components/AddTodo";
import Navbar from "../shared/Navbar";

export default function DashboardPage() {
  return (
    <div>
      <Navbar />
      <AddTodo />
    </div>
  );
}
