import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const NotificationPopup = () => {
  const { state } = useContext(AppContext);
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    if (state.notifications.length > 0) {
      const last = state.notifications[0]; // latest notification
      setLatest(last);

      // auto hide after 3 sec
      setTimeout(() => {
        setLatest(null);
      }, 3000);
    }
  }, [state.notifications]);

  if (!latest) return null;

  return (
    <div style={styles.popup}>
      🔔 {latest.message}
    </div>
  );
};

const styles = {
  popup: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#0d6efd",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    zIndex: 9999
  }
};

export default NotificationPopup;