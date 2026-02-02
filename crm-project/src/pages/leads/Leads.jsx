import { useEffect, useState } from "react";

const LEAD_KEY = "crm_leads";
const EMP_KEY = "crm_employees";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    assignedTo: "",
    status: "New"
  });

  const [editId, setEditId] = useState(null);

  // Load data
  useEffect(() => {
    setLeads(JSON.parse(localStorage.getItem(LEAD_KEY)) || []);
    setEmployees(JSON.parse(localStorage.getItem(EMP_KEY)) || []);
  }, []);

  // Save leads
  useEffect(() => {
    localStorage.setItem(LEAD_KEY, JSON.stringify(leads));
  }, [leads]);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add / Update Lead
  const saveLead = () => {
    if (!form.name || !form.email) {
      alert("Name & Email required");
      return;
    }

    if (editId) {
      setLeads(
        leads.map(l =>
          l.id === editId ? { ...form, id: editId } : l
        )
      );
      setEditId(null);
    } else {
      setLeads([{ ...form, id: Date.now() }, ...leads]);
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      assignedTo: "",
      status: "New"
    });
  };

  // Edit Lead
  const editLead = (lead) => {
    setForm(lead);
    setEditId(lead.id);
  };

  // Delete Lead
  const deleteLead = (id) => {
    if (window.confirm("Delete this lead?")) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  return (
    <div>
      <h1>📌 Lead Management</h1>

      {/* FORM */}
      <div style={styles.form}>
        <input name="name" placeholder="Lead Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />

        <select name="assignedTo" value={form.assignedTo} onChange={handleChange}>
          <option value="">Assign Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.name}>{emp.name}</option>
          ))}
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Lost</option>
        </select>

        <button onClick={saveLead}>
          {editId ? "Update Lead" : "Add Lead"}
        </button>
      </div>

      {/* TABLE */}
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Employee</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr><td colSpan="6" align="center">No Leads</td></tr>
          ) : (
            leads.map(lead => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.assignedTo || "-"}</td>
                <td>{lead.status}</td>
                <td>
                  <button onClick={() => editLead(lead)}>Edit</button>
                  <button onClick={() => deleteLead(lead.id)}>Delete</button>
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
  }
};

export default Leads;
