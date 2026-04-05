// Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  
  const validateAll = () => {
    let newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    
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
    
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!form.role) {
      newErrors.role = "Please select role";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleRegister = () => {
    setSubmitted(true);
    
    if (!validateAll()) return;
    
    // Get existing users or create new array
    const existingUsers = JSON.parse(localStorage.getItem("crmUsers")) || [];
    
    // Check if email already exists
    if (existingUsers.some(user => user.email === form.email)) {
      setErrors({ ...errors, email: "Email already registered" });
      return;
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    existingUsers.push(newUser);
    localStorage.setItem("crmUsers", JSON.stringify(existingUsers));
    
    // Auto login after registration
    const userData = {
      email: form.email,
      password: form.password,
      role: form.role,
      isAuthenticated: true
    };
    localStorage.setItem("crmUser", JSON.stringify(userData));
    
    navigate("/dashboard");
  };
  
  return (
    <div style={styles.page}>
      <AuthLayout title="CRM Registration">
        <div style={styles.card}>
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            autoComplete="off"
          />
          {submitted && errors.name && <p style={styles.error}>{errors.name}</p>}
          
          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            autoComplete="off"
          />
          {submitted && errors.email && <p style={styles.error}>{errors.email}</p>}
          
          {/* PASSWORD */}
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              autoComplete="off"
            />
            <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {submitted && errors.password && <p style={styles.error}>{errors.password}</p>}
          
          {/* CONFIRM PASSWORD */}
          <div style={styles.passwordWrapper}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              autoComplete="off"
            />
            <span style={styles.eyeIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {submitted && errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}
          
          {/* ROLE */}
          <select name="role" value={form.role} onChange={handleChange} style={styles.input}>
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
          {submitted && errors.role && <p style={styles.error}>{errors.role}</p>}
          
          {/* BUTTONS */}
          <button onClick={handleRegister} style={styles.button}>
            Register
          </button>
          
          <button onClick={() => navigate("/login")} style={{...styles.button, ...styles.secondaryButton}}>
            Already have an account? Login
          </button>
        </div>
      </AuthLayout>
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
  },
  secondaryButton: {
    background: "transparent",
    color: "#4f46e5",
    border: "1px solid #4f46e5",
    marginTop: "10px",
  }
};