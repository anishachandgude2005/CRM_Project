import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("crmUser"));

  const handleLogout = () => {
    localStorage.removeItem("crmUser");
    navigate("/");
  };

  return (
    <nav className="navbar shadow-sm px-4">
      <h5 className="m-0 fw-bold">CRM Dashboard</h5>

      {/* Right Side */}
      <div className="ms-auto d-flex align-items-center gap-3">
        <span className="fw-semibold">
          Welcome {user?.role}
        </span>

        <button
          className="btn btn-danger px-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
