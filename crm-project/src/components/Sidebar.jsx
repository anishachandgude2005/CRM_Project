import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside style={styles.sidebar}>
      <h2 style={{ marginBottom: "20px", color: "black" }}>
        CRM
      </h2>

      <NavLink to="/dashboard" style={styles.link}>
        Dashboard
      </NavLink>

      <NavLink to="/leads" style={styles.link}>
        Leads
      </NavLink>

      <NavLink to="/customers" style={styles.link}>
        Customers
      </NavLink>

      <NavLink to="/tasks" style={styles.link}>
        Tasks
      </NavLink>

      <NavLink to="/reports" style={styles.link}>
        Reports
      </NavLink>

      <NavLink to="/settings" style={styles.link}>
        Settings
      </NavLink>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    minHeight: "100vh",
    padding: "20px",
    borderRight: "1px solid #ddd",
    background: "#f9fafb"
  },
  logo: {
    marginBottom: "20px",
    color: "#000",
    fontWeight: "bold"
  },
  link: {
    display: "block",
    padding: "10px 0",
    textDecoration: "none",
    color: "#333"
  }
};

export default Sidebar;
