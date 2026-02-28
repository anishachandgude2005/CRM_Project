import { useState, useEffect } from "react";

export default function Setting() {
  const storedUser = JSON.parse(localStorage.getItem("crmUser"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    emailNotification: true,
    smsNotification: false,
    darkMode: false,
    photo: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (storedUser) {
      setFormData((prev) => ({
        ...prev,
        name: storedUser.name || "",
        email: storedUser.email || "",
        role: storedUser.role || "",
        darkMode: storedUser.darkMode || false,
        photo: storedUser.photo || ""
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match ❌");
      return;
    }

    const updatedUser = {
      ...storedUser,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      darkMode: formData.darkMode,
      photo: formData.photo
    };

    localStorage.setItem("crmUser", JSON.stringify(updatedUser));

    setMessage("Settings Updated Successfully ✅");
    setTimeout(() => setMessage(""), 3000);
  };

  if (!storedUser) {
    return <p style={{ padding: 20 }}>Not logged in</p>;
  }

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Account Settings</h1>

      {message && <div style={styles.alert}>{message}</div>}

      <form onSubmit={handleSave} style={styles.container}>
        
        {/* LEFT SIDE */}
        <div style={styles.leftSection}>
          <div style={styles.card}>
            <h3>Profile Information</h3>

            {formData.photo && (
              <img
                src={formData.photo}
                alt="Profile"
                style={styles.profileImage}
              />
            )}

            <input type="file" onChange={handlePhotoUpload} />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              style={styles.input}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              style={styles.input}
            />

            <input
              type="text"
              value={formData.role}
              disabled
              style={{ ...styles.input, background: "#f1f1f1" }}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.rightSection}>
          <div style={styles.card}>
            <h3>Change Password</h3>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password"
              style={styles.input}
            />

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              style={styles.input}
            />
          </div>

          <div style={styles.card}>
            <h3>Preferences</h3>

            <label style={styles.checkbox}>
              <input
                type="checkbox"
                name="emailNotification"
                checked={formData.emailNotification}
                onChange={handleChange}
              />
              Email Notifications
            </label>

            <label style={styles.checkbox}>
              <input
                type="checkbox"
                name="smsNotification"
                checked={formData.smsNotification}
                onChange={handleChange}
              />
              SMS Notifications
            </label>

            <label style={styles.checkbox}>
              <input
                type="checkbox"
                name="darkMode"
                checked={formData.darkMode}
                onChange={handleChange}
              />
              Enable Dark Mode
            </label>
          </div>
        </div>

        <div style={styles.fullWidth}>
          <button type="submit" style={styles.button}>
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  wrapper: {
    padding: "40px",
    background: "#f4f6f9",
    minHeight: "100vh"
  },
  heading: {
    marginBottom: "20px"
  },
  container: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },
  leftSection: {
    flex: 1,
    minWidth: "350px"
  },
  rightSection: {
    flex: 1,
    minWidth: "350px"
  },
  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  checkbox: {
    display: "block",
    marginTop: "10px"
  },
  button: {
    padding: "12px 25px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  fullWidth: {
    width: "100%",
    marginTop: "10px"
  },
  alert: {
    marginBottom: "20px",
    padding: "12px",
    background: "#e6f4ea",
    color: "green",
    borderRadius: "8px"
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px"
  }
};