import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaBell } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  const user = JSON.parse(localStorage.getItem("crmUser"));

  const handleLogout = () => {
    localStorage.removeItem("crmUser");
    navigate("/");
  };

  return (
    <nav className="navbar shadow-sm px-4 d-flex align-items-center">
      
      {/* LEFT */}
      <h5 className="m-0 fw-bold text-primary">
        CRM Dashboard
      </h5>

      {/* RIGHT */}
      <div className="ms-auto d-flex align-items-center gap-4">

        {/* 🔔 Notification Icon */}
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => navigate("/notification")}
        >
          <FaBell size={20} />

          {/* Badge */}
          {state.notifications.length > 0 && (
            <span style={styles.badge}>
              {state.notifications.length}
            </span>
          )}
        </div>

        {/* 👤 User Info */}
        <div className="text-end">
          <div className="fw-semibold">
            {user?.name || "User"}
          </div>
          <small className="text-muted">
            {user?.role}
          </small>
        </div>

        {/* 🚪 Logout */}
        <button
          className="btn btn-danger px-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  badge: {
    position: "absolute",
    top: "-6px",
    right: "-10px",
    background: "red",
    color: "#fff",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px"
  }
};