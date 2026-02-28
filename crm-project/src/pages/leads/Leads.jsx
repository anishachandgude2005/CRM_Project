import { useContext, useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";

const Leads = () => {
  const { state, dispatch } = useContext(AppContext);

  const leads = state.leads;
  const employees = state.employees;

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    assignedTo: "",
    status: "New"
  };

  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update lead
  const saveLead = () => {
    if (!form.name || !form.email) {
      alert("Name & Email required");
      return;
    }

    if (editId) {
      dispatch({
        type: "UPDATE_LEAD",
        payload: { ...form, id: editId }
      });
      setEditId(null);
    } else {
      dispatch({
        type: "ADD_LEAD",
        payload: { ...form, id: Date.now() }
      });
    }

    setForm(emptyForm);
  };

  const editLead = (lead) => {
    setForm(lead);
    setEditId(lead.id);
  };

  const deleteLead = (id) => {
    if (window.confirm("Delete this lead?")) {
      dispatch({ type: "DELETE_LEAD", payload: id });
    }
  };

  const viewLead = (lead) => {
    alert(
      `Lead Details\n\n` +
        `Name: ${lead.name}\n` +
        `Email: ${lead.email}\n` +
        `Phone: ${lead.phone}\n` +
        `Employee: ${lead.assignedTo || "Not Assigned"}\n` +
        `Status: ${lead.status}`
    );
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-3">Lead Management</h2>

      {/* FORM */}
      <div style={styles.form}>
        <input
          name="name"
          placeholder="Lead Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <select
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
        >
          <option value="">Assign Employee</option>
          {employees
            .filter(emp => emp.active)
            .map(emp => (
              <option key={emp.id} value={emp.name}>
                {emp.name}
              </option>
            ))}
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Lost</option>
        </select>

        <button style={styles.addBtn} onClick={saveLead}>
          {editId ? "Update Lead" : "Add Lead"}
        </button>
      </div>

      {/* TABLE */}
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Employee</th>
            <th>Status</th>
            <th width="200">Action</th>
          </tr>
        </thead>

        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="6" align="center">
                No Leads
              </td>
            </tr>
          ) : (
            leads.map(lead => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.assignedTo || "-"}</td>
                <td>{lead.status}</td>

                <td>
                  <div className="d-flex gap-2">
                    <button
                      style={styles.viewBtn}
                      onClick={() => viewLead(lead)}
                    >
                      <FaEye /> View
                    </button>

                    <button
                      style={styles.editBtn}
                      onClick={() => editLead(lead)}
                    >
                      <FaEdit /> Edit
                    </button>

                    <button
                      style={styles.deleteBtn}
                      onClick={() => deleteLead(lead.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },

  addBtn: {
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    padding: "4px 10px",
    fontSize: "13px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  viewBtn: {
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    padding: "4px 10px",
    fontSize: "13px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  
  editBtn: {
    backgroundColor: "#ffc107",
    color: "#000",
    border: "none",
    padding: "4px 10px",
    fontSize: "13px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "4px 10px",
    fontSize: "13px",
    borderRadius: "5px",
    cursor: "pointer"
  }
  
};

export default Leads;