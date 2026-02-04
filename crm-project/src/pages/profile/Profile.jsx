export default function Profile() {
  const user = JSON.parse(localStorage.getItem("crmUser"));

  if (!user) {
    return <p style={{ padding: 20 }}>Not logged in</p>;
  }

  return (
    <div style={styles.container}>
      <h2>My Profile</h2>

      <div style={styles.card}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "400px",
  },
};
