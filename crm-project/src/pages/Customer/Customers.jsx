import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";

const Customers = () => {
  const { state, dispatch } = useContext(AppContext);

  const currentUser = state.currentUser; // Logged in user

  // 🔥 Role Based Customer Filter
  const customers =
    currentUser?.role === "Lead"
      ? state.customers.filter((c) => c.leadId === currentUser.id)
      : state.customers;

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active",
    leadId: currentUser?.id || null
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Save Customer
  const saveCustomer = () => {
    if (!form.name || !form.email) {
      alert("Name & Email required");
      return;
    }

    if (editId) {
      dispatch({
        type: "UPDATE_CUSTOMER",
        payload: { ...form, id: editId }
      });
      setEditId(null);
    } else {
      dispatch({
        type: "ADD_CUSTOMER",
        payload: { ...form, id: Date.now() }
      });
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "Active",
      leadId: currentUser?.id || null
    });

    setShowForm(false);
  };

  // ✅ View Customer
  const viewCustomer = (cust) => {
    alert(
      `Customer Details\n\n` +
      `Name: ${cust.name}\n` +
      `Email: ${cust.email}\n` +
      `Phone: ${cust.phone}`
    );
  };

  const editCustomer = (cust) => {
    setForm(cust);
    setEditId(cust.id);
    setShowForm(true);
  };

  const deleteCustomer = (id) => {
    if (window.confirm("Delete this customer?")) {
      dispatch({
        type: "DELETE_CUSTOMER",
        payload: id
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={styles.header}>
        <h2>Customer Management</h2>

        <button style={styles.addBtn} onClick={() => setShowForm(true)}>
          <FaPlus /> Add Customer
        </button>
      </div>

      {/* MODAL FORM */}
      {showForm && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>{editId ? "Update Customer" : "Add New Customer"}</h3>

            <input name="name" placeholder="Customer Name" value={form.name} onChange={handleChange} />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
            <input name="company" placeholder="Company" value={form.company} onChange={handleChange} />

            <select name="status" value={form.status} onChange={handleChange}>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <div style={{ marginTop: "15px" }}>
              <button style={styles.saveBtn} onClick={saveCustomer}>
                Save
              </button>
              <button style={styles.cancelBtn} onClick={() => setShowForm(false)}>
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
            <th>Company</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="6" align="center">No Customers</td>
            </tr>
          ) : (
            customers.map((cust) => (
              <tr key={cust.id}>
                <td>{cust.name}</td>
                <td>{cust.email}</td>
                <td>{cust.phone}</td>
                <td>{cust.company}</td>
                <td>{cust.status}</td>
                <td>
                  {/* View */}
                  <button
                    style={styles.viewBtn}
                    onClick={() => viewCustomer(cust)}
                  >
                    <FaEye /> View
                  </button>

                  {/* Edit */}
                  <button
                    style={styles.editBtn}
                    onClick={() => editCustomer(cust)}
                  >
                    <FaEdit /> Edit
                  </button>

                  {/* Delete */}
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteCustomer(cust.id)}
                  >
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
  viewBtn: {
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    marginRight: "8px",
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
  }
};

export default Customers;
