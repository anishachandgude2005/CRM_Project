const Navbar = () => {
    return (
      <header style={styles.navbar}>
        <h3>CRM Dashboard</h3>
  
        <button style={styles.logout}>Logout</button>
      </header>
    );
  };
  
  const styles = {
    navbar: {
      height: "60px",
      padding: "0 20px",
      borderBottom: "1px solid #ddd",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#fff"
    },
    logout: {
      padding: "8px 12px",
      border: "none",
      background: "#ef4444",
      color: "#fff",
      borderRadius: "5px",
      cursor: "pointer"
    }
  };
  
  export default Navbar;
  