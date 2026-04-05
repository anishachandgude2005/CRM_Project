import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // VALIDATION
  const validateAll = () => {
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
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = "Must include uppercase";
    } else if (!/[a-z]/.test(form.password)) {
      newErrors.password = "Must include lowercase";
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "Must include number";
    } else if (!/[@$!%*?&]/.test(form.password)) {
      newErrors.password = "Must include special character";
    }

    if (!form.role) {
      newErrors.role = "Please select role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // LOGIN
  const handleLogin = () => {
    setSubmitted(true);

    if (!validateAll()) return;

    const storedUser = JSON.parse(localStorage.getItem("crmUser"));

    if (!storedUser) {
      localStorage.setItem("crmUser", JSON.stringify(form));
      navigate("/dashboard");
      return;
    }

    if (
      storedUser.email === form.email &&
      storedUser.password === form.password
    ) {
      navigate("/dashboard");
      return;
    }

    if (
      storedUser.email === form.email &&
      storedUser.password !== form.password
    ) {
      setErrors({ password: "Wrong password" });
      return;
    }

    localStorage.setItem("crmUser", JSON.stringify(form));
    navigate("/dashboard");
  };

  return (
    <div style={styles.page}>
      <AuthLayout title="CRM Login">
        <div style={styles.card}>

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
            <option>Admin</option>
            <option>Manager</option>
            <option>Employee</option>
          </select>
          {submitted && errors.role && (
            <p style={styles.error}>{errors.role}</p>
          )}

          {/* BUTTON */}
          <button onClick={handleLogin} style={styles.button}>
            Login
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
};