import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = JSON.parse(localStorage.getItem("user") || "null") as {
    displayName?: string;
    email?: string;
    photoURL?: string;
    uid?: string;
  } | null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
