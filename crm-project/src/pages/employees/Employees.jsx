import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { FaEdit, FaPlus } from "react-icons/fa";

export default function Employees() {
  const { state, dispatch } = useContext(AppContext);
  const employees = state.employees;

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Employee"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ADD / UPDATE (same logic)
  const saveEmployee = () => {
    if (!form.name || !form.email) {
      alert("Name & Email required");
      return;
    }

    if (editId) {
      dispatch({
        type: "UPDATE_EMPLOYEE",
        payload: { ...form, id: editId }
      });

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: Date.now(),
          message: "✏ Employee Updated",
          time: new Date().toLocaleString()
        }
      });

      setEditId(null);
    } else {
      dispatch({
        type: "ADD_EMPLOYEE",
        payload: {
          ...form,
          id: Date.now(),
          active: true
        }
      });

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: Date.now(),
          message: "✅ New Employee Added",
          time: new Date().toLocaleString()
        }
      });
    }

    setForm({ name: "", email: "", role: "Employee" });
    setShowForm(false);
  };

  // ✏ EDIT
  const editEmployee = (emp) => {
    setForm(emp);
    setEditId(emp.id);
    setShowForm(true);
  };

  // 🔁 TOGGLE
  const toggleStatus = (emp) => {
    dispatch({
      type: "TOGGLE_EMPLOYEE",
      payload: emp.id
    });

    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: Date.now(),
        message: `🔁 ${emp.name} is now ${emp.active ? "Inactive" : "Active"}`,
        time: new Date().toLocaleString()
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>Employee Management</h2>

        <button style={styles.addBtn} onClick={() => setShowForm(true)}>
          <FaPlus /> Add Employee
        </button>
      </div>

      {/* MODAL FORM */}
      {showForm && (
        <div style={styles.overlay} onClick={() => setShowForm(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>{editId ? "Update Employee" : "Add New Employee"}</h3>

            <input
              name="name"
              placeholder="Employee Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option>Employee</option>
              <option>Sales</option>
              <option>Support</option>
              <option>Manager</option>
            </select>

            <div style={{ marginTop: "15px" }}>
              <button style={styles.saveBtn} onClick={saveEmployee}>
                Save
              </button>

              <button
                style={styles.cancelBtn}
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5" align="center">No Employees</td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>{emp.active ? "Active" : "Inactive"}</td>

                <td>
                  <button
                    style={styles.editBtn}
                    onClick={() => editEmployee(emp)}
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    style={emp.active ? styles.deleteBtn : styles.saveBtn}
                    onClick={() => toggleStatus(emp)}
                  >
                    {emp.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ✅ SAME STYLE AS LEADS
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  addBtn: {
    background: "#0d6efd",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  editBtn: {
    backgroundColor: "#198754",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    marginRight: "8px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  saveBtn: {
    background: "#198754",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    marginRight: "10px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  cancelBtn: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};