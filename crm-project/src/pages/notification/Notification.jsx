import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaBell, FaCheckCircle, FaTrash } from "react-icons/fa";

const Notification = () => {
  const { state, dispatch } = useContext(AppContext);
  const notifications = state.notifications || [];

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    dispatch({
      type: "MARK_NOTIFICATION_READ",
      payload: id
    });
  };

  const markAllRead = () => {
    dispatch({ type: "MARK_ALL_READ" });
  };

  const deleteNotification = (id) => {
    dispatch({
      type: "DELETE_NOTIFICATION",
      payload: id
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaBell /> Notifications
        </h2>

        <div>
          <span style={styles.badge}>{unreadCount} Unread</span>

          {unreadCount > 0 && (
            <button style={styles.markAllBtn} onClick={markAllRead}>
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div style={styles.emptyBox}>
          <FaBell size={30} />
          <p>No Notifications Available</p>
        </div>
      ) : (
        notifications.map((note) => (
          <div
            key={note.id}
            style={{
              ...styles.card,
              backgroundColor: note.read ? "#ffffff" : "#eef5ff",
              borderLeft: note.read
                ? "5px solid #ccc"
                : "5px solid #0d6efd"
            }}
          >
            <div style={styles.content}>
              <p style={styles.message}>{note.message}</p>
              <small style={styles.date}>{note.date}</small>
            </div>

            <div style={styles.actions}>
              {!note.read && (
                <button
                  style={styles.readBtn}
                  onClick={() => markAsRead(note.id)}
                >
                  <FaCheckCircle /> Read
                </button>
              )}

              <button
                style={styles.deleteBtn}
                onClick={() => deleteNotification(note.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "25px",
    maxWidth: "800px",
    margin: "auto"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  badge: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    marginRight: "10px",
    fontSize: "14px"
  },
  markAllBtn: {
    backgroundColor: "#198754",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  emptyBox: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px"
  },
  card: {
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "0.3s"
  },
  content: {
    flex: 1
  },
  message: {
    margin: 0,
    fontWeight: "500"
  },
  date: {
    color: "#6c757d"
  },
  actions: {
    display: "flex",
    gap: "8px"
  },
  readBtn: {
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Notification;