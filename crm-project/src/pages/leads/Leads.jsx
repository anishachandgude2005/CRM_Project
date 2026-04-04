import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaEdit, FaTrash, FaPlus, FaExchangeAlt, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

const Leads = () => {
  const { state, dispatch } = useContext(AppContext);

  const leads = state.leads;
  const employees = state.employees;

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Search state (only for second table)
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",   // ✅ ADDED
    assignedTo: "",
<<<<<<< HEAD
    status: "New"
=======
    status: "New",
    createdBy: "Admin"
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    createdBy: "",
    assignedTo: ""
>>>>>>> b7607d15ab922f31c3d06f93fa785cf2f39f4949
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
    // Created By validation - only allow letters and spaces
    else if (name === "createdBy") {
      const onlyLettersAndSpaces = /^[A-Za-z\s]*$/;
      if (onlyLettersAndSpaces.test(value)) {
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
      }
    }
    else {
      setForm({ ...form, [name]: value });
      // Clear error when user starts typing
      if (name === "email") {
        setErrors({ ...errors, [name]: "" });
      }
      if (name === "company") {
        setErrors({ ...errors, [name]: "" });
      }
      if (name === "assignedTo") {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  // Validation function for ALL fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = { 
      name: "", 
      email: "", 
      phone: "", 
      company: "", 
      createdBy: "", 
      assignedTo: "" 
    };

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

    // Check if email already exists (for new leads only)
    if (!editId) {
      const emailExists = leads.some(
        lead => lead.email.toLowerCase() === form.email.toLowerCase()
      );
      if (emailExists) {
        newErrors.email = "Email already exists in leads";
        isValid = false;
      }
    } else {
      // For edit, check if email exists for other leads
      const emailExists = leads.some(
        lead => lead.id !== editId && lead.email.toLowerCase() === form.email.toLowerCase()
      );
      if (emailExists) {
        newErrors.email = "Email already exists in leads";
        isValid = false;
      }
    }

    // ✅ Phone validation (optional but must be valid if provided)
    if (form.phone.trim() && !/^[0-9+\-\s]{10,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits, +, -, spaces allowed)";
      isValid = false;
    }

    // ✅ Company validation (optional but must be at least 2 characters if provided)
    if (form.company.trim() && form.company.trim().length < 2) {
      newErrors.company = "Company name must be at least 2 characters";
      isValid = false;
    }

    // ✅ Created By validation
    if (!form.createdBy.trim()) {
      newErrors.createdBy = "Created By is required";
      isValid = false;
    } else if (form.createdBy.trim().length < 2) {
      newErrors.createdBy = "Created By must be at least 2 characters";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(form.createdBy.trim())) {
      newErrors.createdBy = "Created By can only contain letters and spaces";
      isValid = false;
    }

    // ✅ Assigned To validation (optional but must be valid if selected)
    // This is a dropdown, so it's always valid if selected, but we can check if it's not empty
    // No strict validation needed as it's a dropdown with valid options

    setErrors(newErrors);
    return isValid;
  };

  // SAVE LEAD with validation
  const saveLead = () => {
    if (!validateForm()) {
      return;
    }

    if (editId) {
      dispatch({
        type: "UPDATE_LEAD",
        payload: { ...form, id: editId }
      });

      Swal.fire({
        title: "Updated!",
        text: "Lead has been updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
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

<<<<<<< HEAD
=======
      if (form.status === "Qualified") {
        dispatch({
          type: "ADD_TASK",
          payload: {
            id: Date.now(),
            title: `Follow-up: ${form.name}`,
            description: `Lead ${form.name} is qualified. Follow-up required.`,
            assignedBy: form.createdBy || "Admin",
            assignedTo: form.assignedTo || "",
            dueDate: new Date().toISOString().split("T")[0],
            priority: "Medium",
            completed: false
          }
        });
      }

>>>>>>> b7607d15ab922f31c3d06f93fa785cf2f39f4949
      setEditId(null);

    } else {
      const newLead = { ...form, id: Date.now() };

      dispatch({
        type: "ADD_LEAD",
        payload: newLead
      });

      Swal.fire({
        title: "Added!",
        text: "New lead has been added successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
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
<<<<<<< HEAD
=======

      if (newLead.status === "Qualified") {
        dispatch({
          type: "ADD_TASK",
          payload: {
            id: Date.now(),
            title: `Follow-up: ${newLead.name}`,
            description: `Lead ${newLead.name} is qualified. Follow-up required.`,
            assignedBy: newLead.createdBy || "Admin",
            assignedTo: newLead.assignedTo || "",
            dueDate: new Date().toISOString().split("T")[0],
            priority: "Medium",
            completed: false
          }
        });
      }
>>>>>>> b7607d15ab922f31c3d06f93fa785cf2f39f4949
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

<<<<<<< HEAD
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
=======
  // DELETE
  const deleteLead = (id, leadName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete lead "${leadName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "DELETE_LEAD",
          payload: id
        });

        Swal.fire({
          title: "Deleted!",
          text: "Lead has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
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
    });
>>>>>>> b7607d15ab922f31c3d06f93fa785cf2f39f4949
  };

  // CONVERT
  const convertToCustomer = (lead) => {
    Swal.fire({
      title: "Convert Lead?",
      text: `Convert "${lead.name}" to customer?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6f42c1",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, convert",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "CONVERT_LEAD",
          payload: lead
        });

        Swal.fire({
          title: "Converted!",
          text: "Lead converted to customer.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
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
    });
  };
  
  // Search function for SECOND TABLE only
  const getSearchedLeads = () => {
    if (!searchTerm.trim()) {
      return leads;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    
    return leads.filter(lead => {
      return (
        (lead.createdBy || "admin").toLowerCase().includes(searchLower) ||
        (lead.assignedTo || "").toLowerCase().includes(searchLower) ||
        lead.status.toLowerCase().includes(searchLower) ||
        lead.name.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        (lead.phone || "").toLowerCase().includes(searchLower) ||
        (lead.company || "").toLowerCase().includes(searchLower)
      );
    });
  };

  const searchedLeads = getSearchedLeads();

  // EDIT function
  const editLead = (lead) => {
    setForm(lead);
    setEditId(lead.id);
    setShowForm(true);
    setErrors({ name: "", email: "", phone: "", company: "", createdBy: "", assignedTo: "" });
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

<<<<<<< HEAD
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
=======
            {/* Created By Field */}
            <div>
              <input 
                name="createdBy" 
                placeholder="Created By * (Letters only)" 
                value={form.createdBy} 
                onChange={handleChange}
                style={errors.createdBy ? styles.errorInput : {}}
              />
              {errors.createdBy && <div style={styles.errorText}>{errors.createdBy}</div>}
            </div>
            
            {/* Assigned To Field */}
            <div>
              <select name="assignedTo" value={form.assignedTo} onChange={handleChange}>
                <option value="">Assign Employee (Optional)</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.name}>{emp.name}</option>
                ))}
              </select>
              {errors.assignedTo && <div style={styles.errorText}>{errors.assignedTo}</div>}
            </div>
>>>>>>> b7607d15ab922f31c3d06f93fa785cf2f39f4949

            {/* Status Field */}
            <select name="status" value={form.status} onChange={handleChange}>
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Lost</option>
            </select>

<<<<<<< HEAD
=======
            {/* Name Field */}
            <div>
              <input 
                name="name" 
                placeholder="Lead Name * (Letters only)" 
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

>>>>>>> b7607d15ab922f31c3d06f93fa785cf2f39f4949
            <div style={{ marginTop: "15px" }}>
              <button style={styles.saveBtn} onClick={saveLead}>Save</button>

              <button
                style={styles.cancelBtn}
                onClick={() => {
                  setShowForm(false);
                  setErrors({ name: "", email: "", phone: "", company: "", createdBy: "", assignedTo: "" });
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

<<<<<<< HEAD
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
=======
      {/* FIRST TABLE - Shows ALL leads with Actions */}
      <div style={styles.tableContainer}>
        <table border="1" width="100%" cellPadding="10" style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th>Created By</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="8" align="center" style={styles.noData}>
                  No leads available. Click 'Add Lead' to create one.
>>>>>>> b7607d15ab922f31c3d06f93fa785cf2f39f4949
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.createdBy || "Admin"}</td>
                  <td>{lead.assignedTo || "-"}</td>
                  <td>
                    <span style={getStatusStyle(lead.status)}>
                      {lead.status}
                    </span>
                  </td>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone || "-"}</td>
                  <td>{lead.company || "-"}</td>
                  <td style={styles.actionButtons}>
                    <button 
                      style={styles.editBtn} 
                      onClick={() => editLead(lead)}
                      title="Edit Lead"
                    >
                      <FaEdit />
                    </button>
                    
                    {lead.status === "Qualified" && (
                      <button
                        style={styles.convertBtn}
                        onClick={() => convertToCustomer(lead)}
                        title="Convert to Customer"
                      >
                        <FaExchangeAlt />
                      </button>
                    )}
                    
                    <button 
                      style={styles.deleteBtn} 
                      onClick={() => deleteLead(lead.id, lead.name)}
                      title="Delete Lead"
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
            placeholder="🔍 Search leads..."
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
              <th>Created By</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {searchedLeads.length === 0 ? (
              <tr>
                <td colSpan="7" align="center" style={styles.noData}>
                  {searchTerm 
                    ? `No leads found matching "${searchTerm}"` 
                    : "No leads available"}
                </td>
              </tr>
            ) : (
              searchedLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.createdBy || "Admin"}</td>
                  <td>{lead.assignedTo || "-"}</td>
                  <td>
                    <span style={getStatusStyle(lead.status)}>
                      {lead.status}
                    </span>
                  </td>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone || "-"}</td>
                  <td>{lead.company || "-"}</td>
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
    case "New":
      return { ...baseStyle, backgroundColor: "#e3f2fd", color: "#1976d2" };
    case "Contacted":
      return { ...baseStyle, backgroundColor: "#fff3e0", color: "#f57c00" };
    case "Qualified":
      return { ...baseStyle, backgroundColor: "#e8f5e9", color: "#388e3c" };
    case "Lost":
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
  
  convertBtn: { 
    backgroundColor: "#6f42c1", 
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

export default Leads;