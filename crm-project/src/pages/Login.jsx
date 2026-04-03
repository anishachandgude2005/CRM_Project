import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

    // ✅ validation
    if (!email || !password) {
      setError("All fields required");
      return;
    }

    // ✅ get users from localStorage
    const users = JSON.parse(localStorage.getItem("crmUsers")) || [];

    // ✅ find user by email (case-insensitive)
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    // ❌ user not found
    if (!user) {
      setError("User not found. Please register first.");
      return;
    }

    // ❌ wrong password
    if (user.password !== password.trim()) {
      setError("Wrong password");
      return;
    }

    // ❌ wrong role
    if (user.role !== role) {
      setError("Wrong role selected");
      return;
    }

    // ✅ success
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    navigate("/dashboard");
  };

  return (
    <AuthLayout title="Login" subtitle="Welcome back! Please login">
      <div style={styles.card}>

        <h2 style={styles.title}>CRM Login</h2>
        <p style={styles.subtitle}>Welcome back! Please login</p>

        {error && <p style={styles.error}>{error}</p>}

        {/* EMAIL */}
        <div style={styles.inputBox}>
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* PASSWORD */}
        <div style={styles.inputBox}>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* ROLE */}
        <div style={styles.inputBox}>
          <select onChange={(e) => setRole(e.target.value)} style={styles.input}>
            <option>Admin</option>
            <option>Manager</option>
            <option>Employee</option>
          </select>
        </div>

        {/* BUTTON */}
        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        {/* FOOTER */}
        <p style={styles.footer}>
          Don't have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

      </div>
    </AuthLayout>
  );
}

const styles = {
  card: {
    width: "100%",
    maxWidth: "380px",
    padding: "40px 30px",
    borderRadius: "20px",
    background: "#ffffff",
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
    textAlign: "center",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "5px",
    color: "#1f2937",
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "25px",
  },

  inputBox: {
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "13px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "13px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "10px",
  },

  footer: {
    marginTop: "18px",
    fontSize: "14px",
  },

  link: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "600",
  },

  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "13px",
  },
};