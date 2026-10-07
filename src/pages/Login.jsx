import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // NOTE: Demo only. Real authentication (JWT/RBAC) will be connected later.
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>College Accreditation Evidence Management System</h2>
        <p className="muted">NAAC / NBA / ABET</p>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="faculty@college.edu" />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
        <p className="muted small">Demo login – real authentication will be added later.</p>
      </form>
    </div>
  );
}
