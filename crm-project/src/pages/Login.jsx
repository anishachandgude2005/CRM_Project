import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

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

    const user = { email, role };
    localStorage.setItem("crmUser", JSON.stringify(user));

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
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
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
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.2s",
  },
};
