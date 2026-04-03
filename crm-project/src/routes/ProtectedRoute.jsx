import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("crmUser");

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}