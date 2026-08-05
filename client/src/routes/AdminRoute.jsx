import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Role-based protection: only admin users can access
export const AdminRoute = ({ children }) => {
  const { user, token } = useAuth();
  const location = useLocation();

  const effectiveToken = token || localStorage.getItem("token");

  if (!effectiveToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If not admin, redirect to home
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};
