import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar shadow-sm px-4">
  <h5 className="m-0 fw-bold">CRM Dashboard</h5>

  <button className="btn btn-danger ms-auto px-3">
    Logout
  </button>
</nav>
  );
}
