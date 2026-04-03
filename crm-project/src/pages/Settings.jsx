import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaBell, FaMoon } from "react-icons/fa";

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
  const [showPassword, setShowPassword] = useState(false);

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
        
        {/* PROFILE */}
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

            <div style={styles.inputGroup}>
              <FaUser style={styles.icon} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <FaEnvelope style={styles.icon} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                style={styles.input}
              />
            </div>

            <input
              type="text"
              value={formData.role}
              disabled
              style={{ ...styles.input, background: "#f1f1f1", marginTop: "12px" }}
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div style={styles.rightSection}>
          <div style={styles.card}>
            <h3>Change Password</h3>

            {!showPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword(true)}
                style={styles.button}
              >
                Change Password
              </button>
            ) : (
              <>
                <div style={styles.inputGroup}>
                  <FaLock style={styles.icon} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="New Password"
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <FaLock style={styles.icon} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    style={styles.input}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
  
  <button
    type="submit"
    style={{ ...styles.button, background: "#1976d2" }}   // 🔵 Blue Save
  >
    Save
  </button>

  <button
    type="button"
    onClick={() => setShowPassword(false)}
    style={{ ...styles.button, background: "#1976d2" }}
  >
    Cancel
  </button>

</div>
              </>
            )}
          </div>
        </div>

        {/* PREFERENCES */}
        <div style={styles.rightSection}>
          <div style={styles.card}>
            <h3>Preferences</h3>

            <label style={styles.checkbox}>
              <FaBell /> Email Notifications
              <input
                type="checkbox"
                name="emailNotification"
                checked={formData.emailNotification}
                onChange={handleChange}
              />
            </label>

            <label style={styles.checkbox}>
              <FaBell /> SMS Notifications
              <input
                type="checkbox"
                name="smsNotification"
                checked={formData.smsNotification}
                onChange={handleChange}
              />
            </label>

           
           
          </div>
        </div>

        {/* SAVE BUTTON */}
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
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #eff0f2, #f2f2f3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  heading: {
    color: "#1f0d0d",
    marginBottom: "30px",
    fontSize: "32px"
  },

  container: {
    display: "flex",
    flexDirection: "column",   // ✅ vertical layout
    gap: "25px",
    width: "100%",
    maxWidth: "900px"
  },

  leftSection: {
    width: "100%"   // ✅ full width
  },

  rightSection: {
    width: "100%"   // ✅ full width
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    marginBottom: "20px",
    width: "100%"
  },

  inputGroup: {
    display: "flex",
    alignItems: "center",
    background: "#f1f3f6",
    borderRadius: "10px",
    padding: "10px",
    marginTop: "12px"
  },

  icon: {
    marginRight: "10px",
    color: "#1976d2"
  },

  input: {
    border: "none",
    outline: "none",
    background: "transparent",
    width: "100%",
    fontSize: "14px"
  },

  checkbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "12px",
    background: "#f9f9f9",
    padding: "10px",
    borderRadius: "8px"
  },

  button: {
    padding: "12px 30px",
    background: "linear-gradient(135deg, #1976d2, #1976d2)",
    border: "none",
    color: "#fff",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  },

  fullWidth: {
    width: "100%",
    textAlign: "center"
  },

  alert: {
    background: "#fff",
    padding: "12px 20px",
    borderRadius: "10px",
    marginBottom: "20px",
    color: "green"
  },

  profileImage: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    marginBottom: "10px",
    border: "3px solid #1976d2"
  }
};