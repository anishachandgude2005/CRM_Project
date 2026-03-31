import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaTrash } from "react-icons/fa";

const Notification = () => {
  const { state, dispatch } = useContext(AppContext);

  // ✅ FIX
  const notifications = state.notifications || [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔔 Notifications ({notifications.length})</h2>

      <button
        style={styles.clearBtn}
        onClick={() => dispatch({ type: "CLEAR_NOTIFICATIONS" })}
      >
        Clear All
      </button>

      {notifications.length === 0 ? (
        <p>No Notifications</p>
      ) : (
        notifications.map((n) => (
          <div key={n.id} style={styles.card}>
            <div>
              <p>{n.message}</p>
              <small>{n.time}</small>
            </div>

            <button
              style={styles.deleteBtn}
              onClick={() =>
                dispatch({ type: "DELETE_NOTIFICATION", payload: n.id })
              }
            >
              <FaTrash />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    marginBottom: "10px",
    background: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },

  deleteBtn: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  clearBtn: {
    background: "#0d6efd",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    marginBottom: "15px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Notification;