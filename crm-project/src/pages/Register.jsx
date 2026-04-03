import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    setError("");

    if (!email || !password) {
      setError("All fields required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("crmUsers")) || [];

    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      setError("User already exists");
      return;
    }

    users.push({ email, password, role });

    localStorage.setItem("crmUsers", JSON.stringify(users));

    alert("Registered Successfully ✅");
    navigate("/");
  };

  return (
    <AuthLayout title="Register" subtitle="Create account">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <select onChange={(e) => setRole(e.target.value)}>
        <option>Admin</option>
        <option>Manager</option>
        <option>Employee</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </AuthLayout>
  );
}