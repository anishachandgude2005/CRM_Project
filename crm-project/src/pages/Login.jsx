// Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  // Login form state
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Registration modal state
  const [showModal, setShowModal] = useState(false);
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });
  const [regErrors, setRegErrors] = useState({});
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState("");

  // Handle login form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle registration form changes
  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setRegForm({ ...regForm, [name]: value });
  };

  // Validate login
  const validateLogin = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    if (!form.role) {
      newErrors.role = "Please select role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate registration
  const validateRegistration = () => {
    let newErrors = {};

    if (!regForm.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!regForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!regForm.password) {
      newErrors.password = "Password is required";
    } else if (regForm.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    if (!regForm.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (regForm.password !== regForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!regForm.role) {
      newErrors.role = "Please select role";
    }

    setRegErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleLogin = () => {
    setSubmitted(true);

    if (!validateLogin()) return;

    // Get registered users
    const users = JSON.parse(localStorage.getItem("crmUsers")) || [];
    
    // Find user
    const foundUser = users.find(
      user => user.email === form.email && 
              user.password === form.password && 
              user.role === form.role
    );
    
    if (!foundUser) {
      setErrors({ ...errors, email: "Invalid email, password, or role combination" });
      return;
    }

    // Store user data
    const userData = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
      isAuthenticated: true
    };
    
    localStorage.setItem("crmUser", JSON.stringify(userData));
    navigate("/dashboard");
  };

  // Handle registration
  const handleRegistration = () => {
    setRegSubmitted(true);
    
    if (!validateRegistration()) return;
    
    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem("crmUsers")) || [];
    
    // Check if email already exists
    if (existingUsers.some(user => user.email === regForm.email)) {
      setRegErrors({ ...regErrors, email: "Email already registered" });
      return;
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      name: regForm.name,
      email: regForm.email,
      password: regForm.password,
      role: regForm.role,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    existingUsers.push(newUser);
    localStorage.setItem("crmUsers", JSON.stringify(existingUsers));
    
    // Show success message
    setRegistrationSuccess("Registration successful! You can now login.");
    
    // Auto-fill login form with registered email and role
    setForm({
      email: regForm.email,
      password: "", // Don't auto-fill password for security
      role: regForm.role
    });
    
    // Clear registration form
    setRegForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ""
    });
    setRegSubmitted(false);
    setRegErrors({});
    
    // Close modal after 2 seconds
    setTimeout(() => {
      setShowModal(false);
      setRegistrationSuccess("");
    }, 2000);
  };

  // Open registration modal
  const openRegistrationModal = () => {
    setShowModal(true);
    setRegistrationSuccess("");
    setRegForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ""
    });
    setRegErrors({});
    setRegSubmitted(false);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setRegistrationSuccess("");
  };

  return (
    <div style={styles.page}>
      <AuthLayout title="CRM Login">
        <div style={styles.card}>
          
          {/* Success Message */}
          {registrationSuccess && (
            <div style={styles.successMessage}>
              {registrationSuccess}
            </div>
          )}

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            autoComplete="off"
          />
          {submitted && errors.email && (
            <p style={styles.error}>{errors.email}</p>
          )}

          {/* PASSWORD */}
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              autoComplete="off"
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
            </span>
          </div>
          {submitted && errors.password && (
            <p style={styles.error}>{errors.password}</p>
          )}

          {/* ROLE */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
          {submitted && errors.role && (
            <p style={styles.error}>{errors.role}</p>
          )}

          {/* LOGIN BUTTON */}
          <button onClick={handleLogin} style={styles.button}>
            Login
          </button>

          {/* REGISTER LINK */}
          <div style={styles.switchText}>
            Don't have an account?{" "}
            <span 
              style={styles.link} 
              onClick={openRegistrationModal}
            >
              Register here
            </span>
          </div>
        </div>
      </AuthLayout>

      {/* REGISTRATION MODAL */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Create New Account</h2>
              <button style={styles.closeButton} onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            <div style={styles.modalBody}>
              {/* NAME */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={regForm.name}
                onChange={handleRegChange}
                style={styles.input}
              />
              {regSubmitted && regErrors.name && (
                <p style={styles.error}>{regErrors.name}</p>
              )}
              
              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={regForm.email}
                onChange={handleRegChange}
                style={styles.input}
              />
              {regSubmitted && regErrors.email && (
                <p style={styles.error}>{regErrors.email}</p>
              )}
              
              {/* PASSWORD */}
              <div style={styles.passwordWrapper}>
                <input
                  type={showRegPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password (min 6 characters)"
                  value={regForm.password}
                  onChange={handleRegChange}
                  style={styles.input}
                />
                <span 
                  style={styles.eyeIcon} 
                  onClick={() => setShowRegPassword(!showRegPassword)}
                >
                  {/* {showRegPassword ? <FaEyeSlash /> : <FaEye />} */}
                </span>
              </div>
              {regSubmitted && regErrors.password && (
                <p style={styles.error}>{regErrors.password}</p>
              )}
              
              {/* CONFIRM PASSWORD */}
              <div style={styles.passwordWrapper}>
                <input
                  type={showRegConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={regForm.confirmPassword}
                  onChange={handleRegChange}
                  style={styles.input}
                />
                <span 
                  style={styles.eyeIcon} 
                  onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                >
                  {/* {showRegConfirmPassword ? <FaEyeSlash /> : <FaEye />} */}
                </span>
              </div>
              {regSubmitted && regErrors.confirmPassword && (
                <p style={styles.error}>{regErrors.confirmPassword}</p>
              )}
              
              {/* ROLE */}
              <select 
                name="role" 
                value={regForm.role} 
                onChange={handleRegChange} 
                style={styles.input}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
              {regSubmitted && regErrors.role && (
                <p style={styles.error}>{regErrors.role}</p>
              )}
            </div>

            <div style={styles.modalFooter}>
              <button onClick={closeModal} style={styles.cancelButton}>
                Cancel
              </button>
              <button onClick={handleRegistration} style={styles.registerButton}>
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "5px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  error: {
    color: "red",
    fontSize: "12px",
    marginBottom: "8px",
  },

  passwordWrapper: {
    position: "relative",
  },

  eyeIcon: {
    position: "absolute",
    right: "12px",
    top: "35%",
    cursor: "pointer",
    color: "#666",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg,#4f46e5,#6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  
  switchText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#666",
  },
  
  link: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
  },

  successMessage: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "14px",
  },

  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modal: {
    background: "#fff",
    borderRadius: "15px",
    width: "90%",
    maxWidth: "450px",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    animation: "slideIn 0.3s ease-out",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #eee",
  },

  modalTitle: {
    margin: 0,
    fontSize: "20px",
    color: "#333",
  },

  closeButton: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#999",
    padding: "5px",
  },

  modalBody: {
    padding: "20px",
  },

  modalFooter: {
    display: "flex",
    gap: "10px",
    padding: "20px",
    borderTop: "1px solid #eee",
  },

  cancelButton: {
    flex: 1,
    padding: "10px",
    background: "#f8f9fa",
    color: "#666",
    border: "1px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },

  registerButton: {
    flex: 1,
    padding: "10px",
    background: "linear-gradient(135deg,#4f46e5,#6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
};

// Add this CSS animation to your global CSS or index.css
const globalStyles = `
  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// Inject global styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = globalStyles;
  document.head.appendChild(style);
}