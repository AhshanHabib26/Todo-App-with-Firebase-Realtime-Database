import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import DashboardPage from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
]);
