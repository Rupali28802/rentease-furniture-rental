import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  // Effective token: from context state OR localStorage (covers SSO/refresh edge cases)
  const effectiveToken =
    token || localStorage.getItem("token") || localStorage.getItem("token");

  console.log("ProtectedRoute token:", effectiveToken);

  if (!effectiveToken) {
    // Redirect to login, but remember where they were trying to go
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
