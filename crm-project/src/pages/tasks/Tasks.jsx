import { useState } from "react";

const Tasks= () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    assignedTo: "",
    dueDate: "",
    status: "Pending",
    followUp: "",
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.assignedTo || !form.dueDate) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      setTasks(
        tasks.map((t) =>
          t.id === editId ? { ...t, ...form } : t
        )
      );
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), ...form }]);
    }

    setForm({
      title: "",
      assignedTo: "",
      dueDate: "",
      status: "Pending",
      followUp: "",
    });
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setForm(task);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" }
          : t
      )
    );
  };

  return (
    <div style={styles.page}>
      <h1> Task  Management</h1>

      {/* FORM */}
      <form style={styles.row} onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="assignedTo"
          placeholder="Assign To (Employee)"
          value={form.assignedTo}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={styles.input}
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <input
          name="followUp"
          placeholder="Follow-up Notes"
          value={form.followUp}
          onChange={handleChange}
          style={styles.input}
        />

        <button style={styles.button}>
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Assigned To</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Follow-up</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="6" style={styles.noData}>
                No Tasks Created
              </td>
            </tr>
          ) : (
            tasks.map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.assignedTo}</td>
                <td>{t.dueDate}</td>
                <td>
                  <button onClick={() => toggleStatus(t.id)}>
                    {t.status}
                  </button>
                </td>
                <td>{t.followUp || "-"}</td>
                <td>
                  <button onClick={() => handleEdit(t)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(t.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    padding: "20px",
    background: "#1e1e1e",
    color: "#fff",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    background: "#2a2a2a",
    border: "1px solid #555",
    color: "#fff",
    borderRadius: "6px",
  },
  button: {
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#aaa",
  },
};
