import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

const Customers = () => {
  const { state, dispatch } = useContext(AppContext);

  const currentUser = state.currentUser;

  // Role Based Filter
  const customers =
    currentUser?.role === "Lead"
      ? state.customers.filter((c) => c.leadId === currentUser.id)
      : state.customers;

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Search state (only for second table)
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active",
    leadId: currentUser?.id || null
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Name validation - only allow letters and spaces
    if (name === "name") {
      const onlyLettersAndSpaces = /^[A-Za-z\s]*$/;
      if (onlyLettersAndSpaces.test(value)) {
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
      }
    } 
    // Phone validation - only allow numbers, +, -, spaces
    else if (name === "phone") {
      const onlyPhoneChars = /^[0-9+\-\s]*$/;
      if (onlyPhoneChars.test(value)) {
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
      }
    }
    else {
      setForm({ ...form, [name]: value });
      if (name === "email") {
        setErrors({ ...errors, [name]: "" });
      }
      if (name === "company") {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  // Validation function for ALL fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", phone: "", company: "" };

    // ✅ Name validation
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

    // ✅ Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Please enter a valid email address (e.g., name@domain.com)";
        isValid = false;
      }
    }

    // Check if email already exists (for new customers only)
    if (!editId) {
      const emailExists = customers.some(
        customer => customer.email.toLowerCase() === form.email.toLowerCase()
      );
      if (emailExists) {
        newErrors.email = "Email already exists in customers";
        isValid = false;
      }
    } else {
      // For edit, check if email exists for other customers
      const emailExists = customers.some(
        customer => customer.id !== editId && customer.email.toLowerCase() === form.email.toLowerCase()
      );
      if (emailExists) {
        newErrors.email = "Email already exists in customers";
        isValid = false;
      }
    }

    // ✅ Phone validation (optional but must be valid if provided)
    if (form.phone.trim() && !/^[0-9+\-\s()]{10,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits, +, -, spaces allowed)";
      isValid = false;
    }

    // ✅ Company validation (optional but must be at least 2 characters if provided)
    if (form.company.trim() && form.company.trim().length < 2) {
      newErrors.company = "Company name must be at least 2 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // SAVE CUSTOMER with validation
  const saveCustomer = () => {
    if (!validateForm()) {
      return;
    }

    if (editId) {
      // UPDATE
      dispatch({
        type: "UPDATE_CUSTOMER",
        payload: { ...form, id: editId }
      });

      Swal.fire({
        title: "Updated!",
        text: "Customer has been updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: Date.now(),
            message: "✏ Customer Updated",
            time: new Date().toLocaleString()
          }
        });
      }, 100);

      setEditId(null);

    } else {
      // ADD
      const newCustomer = { ...form, id: Date.now() };

      dispatch({
        type: "ADD_CUSTOMER",
        payload: newCustomer
      });

      Swal.fire({
        title: "Added!",
        text: "New customer has been added successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: Date.now(),
            message: "👤 New Customer Added",
            time: new Date().toLocaleString()
          }
        });
      }, 100);
    }

    // Reset form
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

  // EDIT
  const editCustomer = (cust) => {
    setForm(cust);
    setEditId(cust.id);
    setShowForm(true);
    setErrors({ name: "", email: "", phone: "", company: "" });
  };

  // DELETE with confirmation popup
  const deleteCustomer = (id, customerName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete customer "${customerName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "DELETE_CUSTOMER",
          payload: id
        });

        Swal.fire({
          title: "Deleted!",
          text: "Customer has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });

        setTimeout(() => {
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: Date.now(),
              message: "❌ Customer Deleted",
              time: new Date().toLocaleString()
            }
          });
        }, 100);
      }
    });
  };

  // Search function for SECOND TABLE only
  const getSearchedCustomers = () => {
    if (!searchTerm.trim()) {
      return customers;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    
    return customers.filter(customer => {
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        (customer.phone || "").toLowerCase().includes(searchLower) ||
        (customer.company || "").toLowerCase().includes(searchLower) ||
        customer.status.toLowerCase().includes(searchLower)
      );
    });
  };

  const searchedCustomers = getSearchedCustomers();

  return (
    <div style={{ padding: "20px" }}>
      <div style={styles.header}>
        <h2>Customer Management</h2>

        <button style={styles.addBtn} onClick={() => setShowForm(true)}>
          <FaPlus /> Add Customer
        </button>
      </div>

      {/* MODAL */}
      {showForm && (
        <div style={styles.overlay} onClick={() => setShowForm(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>{editId ? "Update Customer" : "Add New Customer"}</h3>

            {/* Name Field */}
            <div>
              <input 
                name="name" 
                placeholder="Customer Name * (Letters only)" 
                value={form.name} 
                onChange={handleChange}
                style={errors.name ? styles.errorInput : {}}
              />
              {errors.name && <div style={styles.errorText}>{errors.name}</div>}
            </div>

            {/* Email Field */}
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

            {/* Phone Field */}
            <div>
              <input 
                name="phone" 
                placeholder="Phone (Optional - numbers, +, -, spaces)" 
                value={form.phone} 
                onChange={handleChange}
                style={errors.phone ? styles.errorInput : {}}
              />
              {errors.phone && <div style={styles.errorText}>{errors.phone}</div>}
            </div>
            
            {/* Company Field */}
            <div>
              <input 
                name="company" 
                placeholder="Company (Optional - min 2 characters)" 
                value={form.company} 
                onChange={handleChange}
                style={errors.company ? styles.errorInput : {}}
              />
              {errors.company && <div style={styles.errorText}>{errors.company}</div>}
            </div>

            {/* Status Field */}
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <div style={{ marginTop: "15px" }}>
              <button style={styles.saveBtn} onClick={saveCustomer}>
                Save
              </button>

              <button
                style={styles.cancelBtn}
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                  setErrors({ name: "", email: "", phone: "", company: "" });
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    status: "Active",
                    leadId: currentUser?.id || null
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FIRST TABLE - Shows ALL customers with Actions */}
      <div style={styles.tableContainer}>
        <table border="1" width="100%" cellPadding="10" style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
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
                <td colSpan="6" align="center" style={styles.noData}>
                  No customers available. Click 'Add Customer' to create one.
                </td>
              </tr>
            ) : (
              customers.map((cust) => (
                <tr key={cust.id}>
                  <td>{cust.name}</td>
                  <td>{cust.email}</td>
                  <td>{cust.phone || "-"}</td>
                  <td>{cust.company || "-"}</td>
                  <td>
                    <span style={getStatusStyle(cust.status)}>
                      {cust.status}
                    </span>
                  </td>
                  <td style={styles.actionButtons}>
                    <button 
                      style={styles.editBtn} 
                      onClick={() => editCustomer(cust)}
                      title="Edit Customer"
                    >
                      <FaEdit />
                    </button>
                    
                    <button 
                      style={styles.deleteBtn} 
                      onClick={() => deleteCustomer(cust.id, cust.name)}
                      title="Delete Customer"
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
            placeholder="🔍 Search customers..."
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
              <th>Phone</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {searchedCustomers.length === 0 ? (
              <tr>
                <td colSpan="5" align="center" style={styles.noData}>
                  {searchTerm 
                    ? `No customers found matching "${searchTerm}"` 
                    : "No customers available"}
                </td>
              </tr>
            ) : (
              searchedCustomers.map((cust) => (
                <tr key={cust.id}>
                  <td>{cust.name}</td>
                  <td>{cust.email}</td>
                  <td>{cust.phone || "-"}</td>
                  <td>{cust.company || "-"}</td>
                  <td>
                    <span style={getStatusStyle(cust.status)}>
                      {cust.status}
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
};

// Helper function for status styling
const getStatusStyle = (status) => {
  const baseStyle = {
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
    display: "inline-block"
  };
  
  switch(status) {
    case "Active":
      return { ...baseStyle, backgroundColor: "#e8f5e9", color: "#388e3c" };
    case "Inactive":
      return { ...baseStyle, backgroundColor: "#ffebee", color: "#d32f2f" };
    default:
      return baseStyle;
  }
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

export default Customers;