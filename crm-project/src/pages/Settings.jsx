import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("crmUser"));
    if (storedUser) {
      setUser({
        name: storedUser.name || "",
        email: storedUser.email || "",
        password: storedUser.password || ""
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const saveChanges = () => {
    localStorage.setItem("crmUser", JSON.stringify(user));
    alert("Settings Updated Successfully");
  };

  const logout = () => {
    localStorage.removeItem("crmUser");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Settings</h2>

      <div className="card p-4 shadow-sm">

        <input
          className="form-control mb-3"
          placeholder="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <button className="btn btn-primary me-2" onClick={saveChanges}>
          Save Changes
        </button>

        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
