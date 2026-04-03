import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  FaPlus,
  FaCheck,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";

export default function Task() {
  const { state, dispatch } = useContext(AppContext);
  const tasks = state.tasks || [];
  const employees = state.employees || [];

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedBy: "Admin",
    assignedTo: "",
    dueDate: "",
    priority: "Medium",
    completed: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      assignedBy: "Admin",
      assignedTo: "",
      dueDate: "",
      priority: "Medium",
      completed: false
    });
    setEditId(null);
  };

  // ADD / UPDATE TASK
  const saveTask = () => {
    if (!form.title || !form.assignedBy || !form.dueDate) {
      alert("Please fill Task Title, Assigned By, and Due Date");
      return;
    }

    if (editId) {
      dispatch({
        type: "UPDATE_TASK",
        payload: {
          ...form,
          id: editId
        }
      });

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: Date.now(),
          message: "✏ Task Updated",
          time: new Date().toLocaleString()
        }
      });
    } else {
      dispatch({
        type: "ADD_TASK",
        payload: {
          ...form,
          id: Date.now()
        }
      });

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: Date.now(),
          message: "✅ New Task Created",
          time: new Date().toLocaleString()
        }
      });
    }

    resetForm();
  };

  // EDIT TASK
  const editTask = (task) => {
    setForm({
      title: task.title,
      description: task.description || "",
      assignedBy: task.assignedBy,
      assignedTo: task.assignedTo || "",
      dueDate: task.dueDate,
      priority: task.priority || "Medium",
      completed: task.completed || false
    });
    setEditId(task.id);
  };

  // DELETE TASK
  const deleteTask = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    dispatch({
      type: "DELETE_TASK",
      payload: id
    });

    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: Date.now(),
        message: "🗑 Task Deleted",
        time: new Date().toLocaleString()
      }
    });
  };

  // MARK COMPLETE
  const toggleComplete = (task) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        ...task,
        completed: !task.completed
      }
    });

    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: Date.now(),
        message: `🔁 Task "${task.title}" marked as ${
          task.completed ? "Pending" : "Completed"
        }`,
        time: new Date().toLocaleString()
      }
    });
  };

  // SEARCH FILTER
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  // SUMMARY
  const today = new Date().toISOString().split("T")[0];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const overdueTasks = tasks.filter(
    (t) => !t.completed && t.dueDate < today
  ).length;

  const getPriorityColor = (priority) => {
    if (priority === "High") return "#dc3545";
    if (priority === "Medium") return "#fd7e14";
    return "#198754";
  };

  const getStatusBadge = (task) => {
    if (task.completed) {
      return <span style={styles.completedBadge}>Completed</span>;
    }
    if (task.dueDate < today) {
      return <span style={styles.overdueBadge}>Overdue</span>;
    }
    return <span style={styles.pendingBadge}>Pending</span>;
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Task & Follow-up Module</h1>

      {/* SUMMARY CARDS */}
      <div style={styles.cardRow}>
        <div style={styles.summaryCard}>
          <FaTasks style={styles.cardIcon} />
          <h3>{totalTasks}</h3>
          <p>Total Tasks</p>
        </div>

        <div style={styles.summaryCard}>
          <FaClock style={styles.cardIcon} />
          <h3>{pendingTasks}</h3>
          <p>Pending Tasks</p>
        </div>

        <div style={styles.summaryCard}>
          <FaCheckCircle style={styles.cardIcon} />
          <h3>{completedTasks}</h3>
          <p>Completed Tasks</p>
        </div>

        <div style={styles.summaryCard}>
          <FaExclamationTriangle style={styles.cardIcon} />
          <h3>{overdueTasks}</h3>
          <p>Overdue Tasks</p>
        </div>
      </div>

      {/* FORM */}
      <div style={styles.formCard}>
        <h2 style={styles.sectionTitle}>
          {editId ? "Update Task" : "Create New Task"}
        </h2>

        <input
          style={styles.input}
          type="text"
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          style={styles.textarea}
          name="description"
          placeholder="Task Description / Follow-up Notes"
          value={form.description}
          onChange={handleChange}
        />

        <div style={styles.grid2}>
          <select
            style={styles.input}
            name="assignedBy"
            value={form.assignedBy}
            onChange={handleChange}
          >
            <option value="">Select Assigned By</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Sales User">Sales User</option>
          </select>

          <select
            style={styles.input}
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
          >
            <option value="">Select Employee</option>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))
            ) : (
              <option value="">No Employees Available</option>
            )}
          </select>
        </div>

        <div style={styles.grid3}>
          <input
            style={styles.input}
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />

          <select
            style={styles.input}
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            style={styles.input}
            name="completed"
            value={form.completed.toString()}
            onChange={(e) =>
              setForm({
                ...form,
                completed: e.target.value === "true"
              })
            }
          >
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </div>

        <div style={{ marginTop: "15px" }}>
          <button style={styles.createBtn} onClick={saveTask}>
            <FaPlus style={{ marginRight: "8px" }} />
            {editId ? "Update Task" : "Create Task"}
          </button>

          {editId && (
            <button style={styles.cancelBtn} onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <FaSearch style={{ marginRight: "10px", color: "#666" }} />
        <input
          type="text"
          placeholder="Search task by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* TASK LIST */}
      <div style={styles.taskSection}>
        <h2 style={styles.sectionTitle}>Task List</h2>

        {filteredTasks.length === 0 ? (
          <p style={{ color: "#666" }}>No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} style={styles.taskCard}>
              <div style={styles.taskLeft}>
                <div style={styles.taskHeader}>
                  <h3 style={styles.taskTitle}>{task.title}</h3>
                  {getStatusBadge(task)}
                </div>

                <p style={styles.taskText}>
                  <strong>Description:</strong>{" "}
                  {task.description || "No description"}
                </p>
                <p style={styles.taskText}>
                  <strong>Assigned By:</strong> {task.assignedBy}
                </p>
                <p style={styles.taskText}>
                  <strong>Assigned To:</strong>{" "}
                  {task.assignedTo || "Not Assigned"}
                </p>
                <p style={styles.taskText}>
                  <strong>Due:</strong> {task.dueDate}
                </p>

                <p style={styles.taskText}>
                  <strong>Priority:</strong>{" "}
                  <span
                    style={{
                      ...styles.priorityBadge,
                      backgroundColor: getPriorityColor(task.priority)
                    }}
                  >
                    {task.priority}
                  </span>
                </p>
              </div>

              <div style={styles.taskActions}>
                <button
                  style={
                    task.completed
                      ? styles.completedBtn
                      : styles.completeBtn
                  }
                  onClick={() => toggleComplete(task)}
                >
                  <FaCheck style={{ marginRight: "6px" }} />
                  {task.completed ? "Completed" : "Mark Complete"}
                </button>

                <button
                  style={styles.editBtn}
                  onClick={() => editTask(task)}
                >
                  <FaEdit style={{ marginRight: "6px" }} />
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTask(task.id)}
                >
                  <FaTrash style={{ marginRight: "6px" }} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    backgroundColor: "#f5f7fb",
    minHeight: "100vh"
  },

  title: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "25px",
    color: "#1f2937"
  },

  cardRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },

  summaryCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "25px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    textAlign: "center"
  },

  cardIcon: {
    fontSize: "28px",
    color: "#0d6efd",
    marginBottom: "10px"
  },

  formCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "25px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    marginBottom: "25px"
  },

  sectionTitle: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "18px",
    color: "#1f2937"
  },

  input: {
    width: "100%",
    padding: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "16px",
    marginBottom: "15px",
    boxSizing: "border-box",
    outline: "none"
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "16px",
    marginBottom: "15px",
    boxSizing: "border-box",
    resize: "vertical",
    outline: "none"
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px"
  },

  grid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "15px"
  },

  createBtn: {
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  },

  cancelBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginLeft: "12px"
  },

  searchBox: {
    background: "#fff",
    borderRadius: "14px",
    padding: "15px 20px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    marginBottom: "25px"
  },

  searchInput: {
    border: "none",
    outline: "none",
    fontSize: "16px",
    width: "100%"
  },

  taskSection: {
    background: "#fff",
    borderRadius: "14px",
    padding: "25px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
  },

  taskCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    flexWrap: "wrap"
  },

  taskLeft: {
    flex: 1
  },

  taskHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
    flexWrap: "wrap"
  },

  taskTitle: {
    fontSize: "24px",
    fontWeight: "700",
    margin: 0,
    color: "#111827"
  },

  taskText: {
    fontSize: "16px",
    color: "#374151",
    marginBottom: "8px"
  },

  priorityBadge: {
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600"
  },

  pendingBadge: {
    backgroundColor: "#fff3cd",
    color: "#856404",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600"
  },

  completedBadge: {
    backgroundColor: "#d1e7dd",
    color: "#0f5132",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600"
  },

  overdueBadge: {
    backgroundColor: "#f8d7da",
    color: "#842029",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600"
  },

  taskActions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minWidth: "180px"
  },

  completeBtn: {
    backgroundColor: "#198754",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600"
  },

  completedBtn: {
    backgroundColor: "#d1e7dd",
    color: "#0f5132",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "default",
    fontSize: "15px",
    fontWeight: "600"
  },

  editBtn: {
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600"
  },

  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600"
  }
};