import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  console.log("ProtectedRoute user:", user); // ✅ DEBUG

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}