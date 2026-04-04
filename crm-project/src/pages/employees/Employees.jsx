import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { FaEdit, FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Employees() {
  const { state, dispatch } = useContext(AppContext);
  const employees = state.employees;

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Search state (only for second table)
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Employee",
    active: true
  });

  const [errors, setErrors] = useState({
    name: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Name validation - only allow letters and spaces
    if (name === "name") {
      const onlyLettersAndSpaces = /^[A-Za-z\s]*$/;
      if (onlyLettersAndSpaces.test(value)) {
        setForm({
          ...form,
          [name]: value
        });
        setErrors({ ...errors, [name]: "" });
      }
    } else if (name === "active") {
      setForm({
        ...form,
        [name]: value === "true"
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
      if (name === "email") {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  // Validation function
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "" };

    // Name validation - only letters and spaces, required
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(form.name.trim())) {
      newErrors.name = "Name can only contain letters and spaces (no numbers or special characters)";
      isValid = false;
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
      }
    }

    // Check if email already exists (for new employees only)
    if (!editId) {
      const emailExists = employees.some(
        employee => employee.email.toLowerCase() === form.email.toLowerCase()
      );
      if (emailExists) {
        newErrors.email = "Email already exists in employees";
        isValid = false;
      }
    } else {
      // For edit, check if email exists for other employees
      const emailExists = employees.some(
        employee => employee.id !== editId && employee.email.toLowerCase() === form.email.toLowerCase()
      );
      if (emailExists) {
        newErrors.email = "Email already exists in employees";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // ADD / UPDATE with validation
  const saveEmployee = () => {
    if (!validateForm()) {
      return;
    }

    if (editId) {
      dispatch({
        type: "UPDATE_EMPLOYEE",
        payload: { ...form, id: editId }
      });

      setTimeout(() => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: Date.now(),
            message: "✏ Employee Updated",
            time: new Date().toLocaleString()
          }
        });
      }, 100);

      setEditId(null);
    } else {
      dispatch({
        type: "ADD_EMPLOYEE",
        payload: {
          ...form,
          id: Date.now()
        }
      });

      setTimeout(() => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: Date.now(),
            message: "✅ New Employee Added",
            time: new Date().toLocaleString()
          }
        });
      }, 100);
    }

    setForm({
      name: "",
      email: "",
      role: "Employee",
      active: true
    });
    setShowForm(false);
  };

  // EDIT
  const editEmployee = (emp) => {
    setForm({
      name: emp.name,
      email: emp.email,
      role: emp.role,
      active: emp.active
    });
    setEditId(emp.id);
    setShowForm(true);
    setErrors({ name: "", email: "" });
  };

  // DELETE with confirmation
  const deleteEmployee = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Delete this employee?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel"
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch({
        type: "DELETE_EMPLOYEE",
        payload: id
      });

      Swal.fire({
        title: "Deleted!",
        text: "Employee removed successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
};

  // Search function for SECOND TABLE only
  const getSearchedEmployees = () => {
    if (!searchTerm.trim()) {
      return employees;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    
    return employees.filter(employee => {
      return (
        employee.name.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower) ||
        employee.role.toLowerCase().includes(searchLower) ||
        (employee.active ? "active" : "inactive").includes(searchLower)
      );
    });
  };

  const searchedEmployees = getSearchedEmployees();

  // Get status style
  const getStatusStyle = (active) => {
    const baseStyle = {
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "bold",
      display: "inline-block"
    };
    
    if (active) {
      return { ...baseStyle, backgroundColor: "#e8f5e9", color: "#388e3c" };
    } else {
      return { ...baseStyle, backgroundColor: "#ffebee", color: "#d32f2f" };
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>Employee Management</h2>

        <button
          style={styles.addBtn}
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setErrors({ name: "", email: "" });
            setForm({
              name: "",
              email: "",
              role: "Employee",
              active: true
            });
          }}
        >
          <FaPlus /> Add Employee
        </button>
      </div>

      {/* MODAL FORM */}
      {showForm && (
        <div style={styles.overlay} onClick={() => setShowForm(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>{editId ? "Update Employee" : "Add New Employee"}</h3>

            <div>
              <input
                name="name"
                placeholder="Employee Name * (Letters only)"
                value={form.name}
                onChange={handleChange}
                style={errors.name ? styles.errorInput : {}}
              />
              {errors.name && <div style={styles.errorText}>{errors.name}</div>}
            </div>

            <div>
              <input
                name="email"
                placeholder="Email *"
                value={form.email}
                onChange={handleChange}
                style={errors.email ? styles.errorInput : {}}
              />
              {errors.email && <div style={styles.errorText}>{errors.email}</div>}
            </div>

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

            <select
              name="active"
              value={form.active.toString()}
              onChange={handleChange}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
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
                  setErrors({ name: "", email: "" });
                  setForm({
                    name: "",
                    email: "",
                    role: "Employee",
                    active: true
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FIRST TABLE - Shows ALL employees with Actions */}
      <div style={styles.tableContainer}>
        <table border="1" width="100%" cellPadding="10" style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
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
                <td colSpan="5" align="center" style={styles.noData}>
                  No employees available. Click 'Add Employee' to create one.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>
                    <span style={getStatusStyle(emp.active)}>
                      {emp.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={styles.actionButtons}>
                    <button 
                      style={styles.editBtn} 
                      onClick={() => editEmployee(emp)}
                      title="Edit Employee"
                    >
                      <FaEdit />
                    </button>
                    
                    <button 
                      style={styles.deleteBtn} 
                      onClick={() => deleteEmployee(emp.id, emp.name)}
                      title="Delete Employee"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* SEARCH BAR - Controls the second table only */}
      <div style={styles.searchContainer}>
        <div style={styles.searchBox}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="🔍 Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          {searchTerm && (
            <button
              style={styles.clearSearch}
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* SECOND TABLE - Shows search results WITHOUT Actions column */}
      <div style={styles.tableContainer}>
        <table border="1" width="100%" cellPadding="10" style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {searchedEmployees.length === 0 ? (
              <tr>
                <td colSpan="4" align="center" style={styles.noData}>
                  {searchTerm 
                    ? `No employees found matching "${searchTerm}"` 
                    : "No employees available"}
                </td>
              </tr>
            ) : (
              searchedEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>
                    <span style={getStatusStyle(emp.active)}>
                      {emp.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  
  tableContainer: {
    marginBottom: "30px",
    overflowX: "auto"
  },
  
  searchContainer: {
    marginBottom: "20px",
    width: "100%"
  },
  
  searchBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "8px 12px",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  
  searchIcon: {
    color: "#999",
    marginRight: "10px"
  },
  
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    padding: "8px 0"
  },
  
  clearSearch: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#999",
    padding: "0 8px",
    borderRadius: "4px"
  },
  
  editBtn: {
    backgroundColor: "#198754",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    marginRight: "5px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    width: "32px"
  },
  
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    width: "32px"
  },
  
  actionButtons: {
    whiteSpace: "nowrap"
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
    gap: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
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
  },
  
  errorInput: {
    border: "1px solid #dc3545"
  },
  
  errorText: {
    color: "#dc3545",
    fontSize: "12px",
    marginTop: "4px"
  },
  
  table: {
    borderCollapse: "collapse",
    width: "100%",
    border: "1px solid #ddd"
  },
  
  tableHeader: {
    backgroundColor: "#f8f9fa",
    borderBottom: "2px solid #ddd"
  },
  
  noData: {
    padding: "40px",
    color: "#999",
    fontSize: "14px"
  }
};