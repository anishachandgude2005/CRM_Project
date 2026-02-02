import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");

  const navigate= useNavigate();

  const handleLogin = () => {
    setError("");

    // Validation
    if (!email) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    // Mock login success
    const user = { email, role };
    localStorage.setItem("crmUser", JSON.stringify(user));

    window.location.href = "/";
  };

  return (
    <AuthLayout>
      <h2 style={styles.title}>CRM Login</h2>

      {error && <p style={styles.error}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={styles.input}
      >
        <option>Admin</option>
        <option>Manager</option>
        <option>Employee</option>
      </select>

      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
    </AuthLayout>
  );
}

const styles = {
  title: {
    textAlign: "center",
    marginBottom: "15px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
