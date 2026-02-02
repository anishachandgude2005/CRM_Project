const AuthLayout = ({ title, children }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {title && <h2 style={styles.title}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",          // FULL WIDTH
    height: "100vh",         // FULL HEIGHT
    display: "flex",
    justifyContent: "center", // CENTER HORIZONTALLY
    alignItems: "center",     // CENTER VERTICALLY
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    margin: 0,
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
    background: "#ffffff",
    borderRadius: "14px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
  },
   title: {
    fontSize: "clamp(22px, 3vw, 30px)",
    fontWeight: "800",
    textAlign: "center",
    color: "#1f2937",
    marginBottom: "6px",
  },
};

export default AuthLayout;
