    import { Navigate } from "react-router-dom";

export default function RoleRoute({ children, roles }) {
  const user = JSON.parse(localStorage.getItem("crmUser"));

  if (!user) return <Navigate to="/" />;

  if (!roles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}