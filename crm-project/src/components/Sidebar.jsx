import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  FaTachometerAlt,
  FaUserTie,
  FaUsers,
  FaTasks,
  FaChartBar,
  FaUser,
  FaBell,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("crmUser"));

  return (
    <aside className="sidebar">
      <h3 className="logo">CRM System</h3>

      <nav>

        <NavLink to="/dashboard" className="nav-link">
          <FaTachometerAlt /> Dashboard
        </NavLink>

        {/* Admin + Manager */}
        {(user?.role === "Admin" || user?.role === "Manager") && (
          <>
            <NavLink to="/leads" className="nav-link">
              <FaUserTie /> Leads
            </NavLink>

            <NavLink to="/customers" className="nav-link">
              <FaUsers /> Customers
            </NavLink>
          </>
        )}

        {/* Admin Only */}
        {user?.role === "Admin" && (
          <NavLink to="/employees" className="nav-link">
            <FaUsers /> Employees
          </NavLink>
        )}

        {/* All Roles */}
        <NavLink to="/tasks" className="nav-link">
          <FaTasks /> Tasks
        </NavLink>

        {/* Admin + Manager */}
        {(user?.role === "Admin" || user?.role === "Manager") && (
          <NavLink to="/reports" className="nav-link">
            <FaChartBar /> Reports
          </NavLink>
        )}

        {(user?.role === "Admin" || user?.role === "Manager") && (
          <NavLink to="/settings" className="nav-link">
            <FaCog /> Settings
          </NavLink>
        )}

        <NavLink to="/profile" className="nav-link">
          <FaUser /> My Profile
        </NavLink>

      </nav>
    </aside>
  );
}