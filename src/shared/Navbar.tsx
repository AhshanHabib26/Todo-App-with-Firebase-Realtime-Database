import { useNavigate } from "react-router-dom";

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
    <div>
      <div>
        <h2>{user.displayName || "Anonymas"}</h2>
        <p>{user.email || "Searching...."}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
