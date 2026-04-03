import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // ❌ Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ Logged in → allow access
  return children;
};

export default ProtectedRoute;