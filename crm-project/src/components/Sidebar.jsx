import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("crmUser"));

  return (
    <aside className="sidebar">
      <h3 className="logo">CRM System</h3>

      <nav>
        <NavLink to="/dashboard" className="nav-link">
          Dashboard
        </NavLink>

        {/* Admin + Manager */}
        {(user?.role === "Admin" || user?.role === "Manager") && (
          <>
            <NavLink to="/leads" className="nav-link">
              Leads
            </NavLink>

            <NavLink to="/customers" className="nav-link">
              Customers
            </NavLink>
          </>
        )}

        {/* Admin Only */}
        {user?.role === "Admin" && (
          <NavLink to="/employees" className="nav-link">
            Employees
          </NavLink>
        )}

        {/* All Roles */}
        <NavLink to="/tasks" className="nav-link">
          Tasks
        </NavLink>

        {/* Admin + Manager */}
        {(user?.role === "Admin" || user?.role === "Manager") && (
          <NavLink to="/reports" className="nav-link">
            Reports
          </NavLink>
        )}

        <NavLink to="/settings" className="nav-link">
          Settings
        </NavLink>

        <NavLink to="/profile" className="nav-link">
          My Profile
        </NavLink>
      </nav>
    </aside>
  );
}
