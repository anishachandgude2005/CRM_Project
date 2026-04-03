const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {title && <h2 style={styles.title}>{title}</h2>}
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Poppins, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px 30px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    textAlign: "center",
    animation: "fadeIn 0.6s ease-in-out",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#1f2937",
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
    transition: "0.3s",
  },

  select: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },

  footer: {
    marginTop: "15px",
    fontSize: "14px",
  },

  link: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "500",
  }
};

export default AuthLayout;