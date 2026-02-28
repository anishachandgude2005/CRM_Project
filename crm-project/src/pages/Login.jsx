import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");

  const navigate = useNavigate();

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

  const storedUser = JSON.parse(localStorage.getItem("crmUser"));

  // 🟢 First Time (No user stored)
  if (!storedUser) {
    const newUser = { email, password, role };
    localStorage.setItem("crmUser", JSON.stringify(newUser));
    navigate("/dashboard");
    return;
  }

  // 🟢 Same Email + Correct Password
  if (storedUser.email === email && storedUser.password === password) {
    navigate("/dashboard");
    return;
  }

  // 🔴 Same Email + Wrong Password
  if (storedUser.email === email && storedUser.password !== password) {
    setError("Password is wrong");
    return;
  }

  // 🟢 Different Email → Create New Account
  const newUser = { email, password, role };
  localStorage.setItem("crmUser", JSON.stringify(newUser));
  navigate("/dashboard");
};

  return (
    <div style={styles.container}>
      <AuthLayout title="CRM Login">
        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter your password"
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
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
  },
};