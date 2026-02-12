import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const CUST_KEY = "crm_customers";

const Customers = () => {
 const { state, dispatch } = useContext(AppContext);
 const customers = state.customers;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active"
  });

  const [editId, setEditId] = useState(null);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const saveCustomer = () => {
  if (!form.name || !form.email) {
    alert("Name & Email required");
    return;
  }

  dispatch({
    type: "ADD_CUSTOMER",
    payload: { ...form, id: Date.now() }
  });

  setForm({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active"
  });
};

  const viewCustomer = (cust) => {
    alert(
      `Customer Details\n\n` +
      `Name: ${cust.name}\n` +
      `Email: ${cust.email}\n` +
      `Phone: ${cust.phone}\n` +
      `Company: ${cust.company}\n` +
      `Status: ${cust.status}`
    );
  };

  const editCustomer = (cust) => {
    setForm(cust);
    setEditId(cust.id);
  };

  const deleteCustomer = (id) => {
    if (window.confirm("Delete this customer?")) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      <h2>Customer Management</h2>

      {/* FORM */}
      <div style={styles.form}>
        <input name="name" placeholder="Customer Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} />

        <select name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button style={styles.addBtn} onClick={saveCustomer}>
          {editId ? "Update Customer" : "Add Customer"}
        </button>
      </div>

      {/* TABLE */}
      <table border="1" width="1200" cellPadding="10">
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
            customers.map(cust => (
              <tr key={cust.id}>
                <td>{cust.name}</td>
                <td>{cust.email}</td>
                <td>{cust.phone}</td>
                <td>{cust.company}</td>
                <td>{cust.status}</td>
                <td>
                  <button style={styles.viewBtn} onClick={() => viewCustomer(cust)}>
                    <FaEye /> View
                  </button>
                  <button style={styles.editBtn} onClick={() => editCustomer(cust)}>
                    <FaEdit /> Edit
                  </button>
                  <button style={styles.deleteBtn} onClick={() => deleteCustomer(cust.id)}>
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
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  addBtn: {
    backgroundColor: "#198754",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    cursor: "pointer",
    borderRadius: "4px"
  },
  viewBtn: {
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    marginRight: "5px",
    cursor: "pointer",
    borderRadius: "4px"
  },
  editBtn: {
    backgroundColor: "#198754",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    marginRight: "5px",
    cursor: "pointer",
    borderRadius: "4px"
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
    borderRadius: "4px"
  }
};

export default Customers;
