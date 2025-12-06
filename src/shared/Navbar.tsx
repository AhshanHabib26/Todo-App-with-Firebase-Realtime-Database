import { useNavigate } from "react-router-dom";
import Container from "../utils/Container";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null") as {
    displayName?: string;
    email?: string;
  } | null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;
  return (
    <div className="bg-teal-800 text-white py-2">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">
              {user.displayName || "Anonymas"}
            </h2>
            <p className="text-xs font-mono -mt-1.5">
              {user.email || "Searching...."}
            </p>
          </div>
          <button
            className="bg-red-600 px-3 py-1 text-lg font-mono rounded cursor-pointer hover:bg-red-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </Container>
    </div>
  );
}
