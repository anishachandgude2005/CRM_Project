import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h3 className="logo">CRM System</h3>

      <nav>
        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
        <NavLink to="/leads" className="nav-link">Leads</NavLink>
        <NavLink to="/customers" className="nav-link">Customers</NavLink>
        <NavLink to="/employees" className="nav-link">Employees</NavLink>
        <NavLink to="/tasks" className="nav-link">Tasks</NavLink>
        <NavLink to="/reports" className="nav-link">Reports</NavLink>
        <NavLink to="/settings" className="nav-link">Settings</NavLink>
      </nav>
    </aside>
  );
}
