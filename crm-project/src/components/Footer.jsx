import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* BOTTOM */}
      <div style={styles.bottom}>
        © {new Date().getFullYear()} CRM System | All Rights Reserved
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "#ffffff",   // ✅ changed to white
    color: "#000",           // ✅ text black
    marginTop: "40px"
  },

  bottom: {
    textAlign: "center",
    padding: "15px",
    borderTop: "1px solid #ddd", // ✅ light border
    fontSize: "13px",
    color: "#555" // ✅ dark grey text
  }
};

export default Footer;