import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <h2>Accreditation Evidence System</h2>
      <div className="links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/upload">Upload Evidence</NavLink>
        <NavLink to="/documents">Documents</NavLink>
        <NavLink to="/review">Review</NavLink>
        <button className="logout" onClick={() => navigate("/login")}>Logout</button>
      </div>
    </div>
  );
}
