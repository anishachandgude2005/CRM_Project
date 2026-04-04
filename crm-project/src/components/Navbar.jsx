import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaBell, FaUser } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  const user = JSON.parse(localStorage.getItem("crmUser"));

  return (
    <nav className="navbar shadow-sm px-4 d-flex align-items-center">
      
      {/* LEFT */}
      <h5 className="m-0 fw-bold text-primary">
        CRM Dashboard
      </h5>

      {/* RIGHT */}
      <div className="ms-auto d-flex align-items-center gap-4">

        {/* 🔔 Notification */}
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => navigate("/notification")}
        >
          <FaBell size={20} />

          {state.notifications.length > 0 && (
            <span style={styles.badge}>
              {state.notifications.length}
            </span>
          )}
        </div>

        {/* 👤 USER INFO */}
        <div className="text-end">
          <div className="fw-semibold">
            {user?.name || "User"}
          </div>
          <small className="text-muted">
            {user?.role}
          </small>
        </div>

        {/* ✅ MY PROFILE BUTTON */}
        <button
          style={styles.profileBtn}
          onClick={() => navigate("/profile")}
        >
          <FaUser style={{ marginRight: "6px" }} />
          
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
  },

  profileBtn: {
    background: "linear-gradient(135deg,#36d1dc,#5b86e5)",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center"
  }
};