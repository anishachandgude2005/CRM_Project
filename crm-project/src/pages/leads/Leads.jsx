import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaEdit, FaTrash, FaEye, FaPlus, FaExchangeAlt } from "react-icons/fa";

const Leads = () => {
  const { state, dispatch } = useContext(AppContext);

  const leads = state.leads;
  const employees = state.employees;

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",   // ✅ ADDED
    assignedTo: "",
    status: "New"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SAVE LEAD
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

      setTimeout(() => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            message: "✏ Lead Updated",
            time: new Date().toLocaleString()
          }
        });
      }, 100);

      setEditId(null);

    } else {
      const newLead = { ...form, id: Date.now() };

      dispatch({
        type: "ADD_LEAD",
        payload: newLead
      });

      setTimeout(() => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            message: "✅ New Lead Added",
            time: new Date().toLocaleString()
          }
        });
      }, 100);
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",   // ✅ RESET
      assignedTo: "",
      status: "New"
    });

    setShowForm(false);
  };

  // 👁 VIEW
  const viewLead = (lead) => {
    alert(
      `Lead Details\n\n` +
      `Name: ${lead.name}\n` +
      `Email: ${lead.email}\n` +
      `Phone: ${lead.phone}\n` +
      `Company: ${lead.company || "-"}\n` +
      `Employee: ${lead.assignedTo || "Not Assigned"}\n` +
      `Status: ${lead.status}`
    );
  };

  // ✏ EDIT
  const editLead = (lead) => {
    setForm(lead);
    setEditId(lead.id);
    setShowForm(true);
  };

  // ❌ DELETE
  const deleteLead = (id) => {
    if (window.confirm("Delete this lead?")) {
      dispatch({
        type: "DELETE_LEAD",
        payload: id
      });

      setTimeout(() => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            message: "❌ Lead Deleted",
            time: new Date().toLocaleString()
          }
        });
      }, 100);
    }
  };

  // 🔁 CONVERT
  const convertToCustomer = (lead) => {
    if (window.confirm("Convert this lead to customer?")) {
      dispatch({
        type: "CONVERT_LEAD",
        payload: lead
      });

      setTimeout(() => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            message: "🔁 Lead Converted to Customer",
            time: new Date().toLocaleString()
          }
        });
      }, 100);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={styles.header}>
        <h2>Lead Management</h2>

        <button style={styles.addBtn} onClick={() => setShowForm(true)}>
          <FaPlus /> Add Lead
        </button>
      </div>

      {/* MODAL */}
      {showForm && (
        <div style={styles.overlay} onClick={() => setShowForm(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>{editId ? "Update Lead" : "Add New Lead"}</h3>

            <input name="name" placeholder="Lead Name" value={form.name} onChange={handleChange} />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
            
            <input name="company" placeholder="Company" value={form.company} onChange={handleChange} /> {/* ✅ ADDED */}

            <select name="assignedTo" value={form.assignedTo} onChange={handleChange}>
              <option value="">Assign Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>

            <select name="status" value={form.status} onChange={handleChange}>
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Lost</option>
            </select>

            <div style={{ marginTop: "15px" }}>
              <button style={styles.saveBtn} onClick={saveLead}>Save</button>

              <button
                style={styles.cancelBtn}
                onClick={() => {
                  setShowForm(false);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    assignedTo: "",
                    status: "New"
                  });
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
            <th>Phone</th>
            <th>Company</th> {/* ✅ ADDED */}
            <th>Assigned To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="7" align="center">No Leads</td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.company || "-"}</td> {/* ✅ ADDED */}
                <td>{lead.assignedTo || "-"}</td>
                <td>{lead.status}</td>

                <td>
                  <button style={styles.viewBtn} onClick={() => viewLead(lead)}>
                    <FaEye /> View
                  </button>

                  <button style={styles.editBtn} onClick={() => editLead(lead)}>
                    <FaEdit /> Edit
                  </button>

                  {lead.status === "Qualified" && (
                    <button
                      style={styles.convertBtn}
                      onClick={() => convertToCustomer(lead)}
                    >
                      <FaExchangeAlt /> Convert
                    </button>
                  )}

                  <button style={styles.deleteBtn} onClick={() => deleteLead(lead.id)}>
                    <FaTrash /> Delete
                  </button>
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
  header: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
  addBtn: { background: "#0d6efd", color: "#fff", padding: "8px 15px", border: "none", borderRadius: "6px", cursor: "pointer" },
  viewBtn: { backgroundColor: "#0d6efd", color: "#fff", border: "none", padding: "6px 12px", marginRight: "8px", borderRadius: "6px", cursor: "pointer" },
  editBtn: { backgroundColor: "#198754", color: "#fff", border: "none", padding: "6px 12px", marginRight: "8px", borderRadius: "6px", cursor: "pointer" },
  convertBtn: { backgroundColor: "#6f42c1", color: "#fff", border: "none", padding: "6px 12px", marginRight: "8px", borderRadius: "6px", cursor: "pointer" },
  deleteBtn: { backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" },
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { background: "#fff", padding: "25px", borderRadius: "10px", width: "400px", display: "flex", flexDirection: "column", gap: "10px" },
  saveBtn: { background: "#198754", color: "#fff", border: "none", padding: "8px 12px", marginRight: "10px", borderRadius: "5px" },
  cancelBtn: { background: "#dc3545", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "5px" }
};

export default Leads;