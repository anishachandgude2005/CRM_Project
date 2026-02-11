import { useState } from "react";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all required fields");
      return;
    }

    if (editId) {
      // UPDATE
      setCustomers(
        customers.map((cust) =>
          cust.id === editId ? { ...cust, ...form } : cust
        )
      );
      setEditId(null);
    } else {
      // CREATE
      setCustomers([
        ...customers,
        {
          id: Date.now(),
          ...form,
        },
      ]);
    }

    // RESET FORM
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "Active",
    });
  };

  const handleEdit = (cust) => {
    setEditId(cust.id);
    setForm(cust);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((cust) => cust.id !== id));
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}> Customer Management</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={styles.row}>
        <input
          style={styles.input}
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
        />

        <select
          style={styles.input}
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button style={styles.button}>
          {editId ? "Update Customer" : "Add Customer"}
        </button>
      </form>

      {/* TABLE */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.noData}>
                  No Customers Found
                </td>
              </tr>
            ) : (
              customers.map((cust) => (
                <tr key={cust.id}>
                  <td>{cust.name}</td>
                  <td>{cust.email}</td>
                  <td>{cust.phone}</td>
                  <td>{cust.company || "-"}</td>
                  <td>{cust.status}</td>
                  <td>
                    <button
                      style={styles.editBtn}
                      onClick={() => handleEdit(cust)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(cust.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;

/* ================= STYLES ================= */

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    padding: "20px",
    background: "#1e1e1e",
    color: "#fff",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "20px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "12px",
    marginBottom: "20px",
  },
  input: {
    padding: "12px",
    background: "#2a2a2a",
    border: "1px solid #555",
    borderRadius: "6px",
    color: "#fff",
  },
  button: {
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
  tableWrapper: {
    width: "100%",
    background: "#222",
    borderRadius: "8px",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  noData: {
    textAlign: "center",
    padding: "30px",
    color: "#aaa",
  },
  editBtn: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    background: "#b91c1c",
    color: "#fff",
    cursor: "pointer",
  },
};
