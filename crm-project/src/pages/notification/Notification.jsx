import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Notifications() {
  const { state, dispatch } = useContext(AppContext);
  const notifications = state.notifications;

  const markRead = (id) => {
    dispatch({
      type: "MARK_AS_READ",
      payload: id
    });
  };

  const markUnread = (id) => {
    dispatch({
      type: "MARK_AS_UNREAD",
      payload: id
    });
  };

  const unreadCount = notifications.filter(
    (n) => !n.isRead
  ).length;

  return (
    <div className="container-fluid">
      <h2 className="mb-3">
        Notifications
        {unreadCount > 0 && (
          <span className="badge bg-danger ms-2">
            {unreadCount}
          </span>
        )}
      </h2>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Message</th>
            <th>Type</th>
            <th>Status</th>
            <th width="200">Action</th>
          </tr>
        </thead>

        <tbody>
          {notifications.length === 0 ? (
            <tr>
              <td colSpan="4" align="center">
                No Notifications
              </td>
            </tr>
          ) : (
            notifications.map((n) => (
              <tr key={n.id}>
                <td>{n.message}</td>
                <td>{n.type}</td>
                <td>
                  {n.isRead ? "Read" : "Unread"}
                </td>
                <td>
                  {n.isRead ? (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => markUnread(n.id)}
                    >
                      Mark Unread
                    </button>
                  ) : (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => markRead(n.id)}
                    >
                      Mark Read
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}