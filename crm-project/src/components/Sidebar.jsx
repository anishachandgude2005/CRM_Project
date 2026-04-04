import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  FaTachometerAlt,
  FaUserTie,
  FaUsers,
  FaTasks,
  FaChartBar,
  FaBell,
  FaCog,
<<<<<<< HEAD
  FaUser,
=======
>>>>>>> b7607d15ab922f31c3d06f93fa785cf2f39f4949
  FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("crmUser"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("crmUser");
    navigate("/");
  };

  return (
    <aside className="sidebar d-flex flex-column" style={{ height: "100vh" }}>
      
      <h3 className="logo text-center py-3">CRM System</h3>

      {/* MENU */}
      <nav className="nav flex-column px-3">

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

        {/* All */}
        <NavLink to="/tasks" className="nav-link">
          <FaTasks /> Tasks
        </NavLink>

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

        {(user?.role === "Admin" || user?.role === "Manager") && (
          <NavLink to="/notification" className="nav-link">
            <FaBell /> Notifications
          </NavLink>
        )}
        <NavLink to="/profile" className="nav-link">
          <FaUser /> My Profile
        </NavLink>

      </nav>

      {/* 🔥 LOGOUT BUTTON (BOTTOM) */}
      <div className="mt-auto text-center pb-3">
        <button
          className="btn btn-danger px-3 d-flex align-items-center justify-content-center gap-2 mx-3"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}