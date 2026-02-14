import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { FaEdit } from "react-icons/fa";

export default function Employees() {
  const { state, dispatch } = useContext(AppContext);
  const employees = state.employees;

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Employee"
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add / Update Employee
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
    }

    setForm({ name: "", email: "", role: "Employee" });
  };

  const editEmployee = (emp) => {
    setForm(emp);
    setEditId(emp.id);
  };

  const toggleStatus = (emp) => {
    dispatch({
      type: "TOGGLE_EMPLOYEE",
      payload: emp.id
    });
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-3">Employee Management</h2>

      {/* FORM */}
      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Employee Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="form-control"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <select
          className="form-control"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option>Employee</option>
          <option>Sales</option>
          <option>Support</option>
          <option>Manager</option>
        </select>

        <button
          className="btn btn-primary"
          onClick={saveEmployee}
        >
          {editId ? "Update" : "Add"} Employee
        </button>
      </div>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th width="220">Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5" align="center">
                No Employees
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>
                  {emp.active ? "Active" : "Inactive"}
                </td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editEmployee(emp)}
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    className={
                      emp.active
                        ? "btn btn-danger btn-sm"
                        : "btn btn-success btn-sm"
                    }
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
