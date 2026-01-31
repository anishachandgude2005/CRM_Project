const AuthLayout = ({ title, children }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "20px",
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
    textAlign: "center",
    marginBottom: "22px",
    fontWeight: "700",
    fontSize: "22px",
  },
};

export default AuthLayout;
