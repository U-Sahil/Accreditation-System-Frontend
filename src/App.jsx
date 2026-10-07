import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UploadEvidence from "./pages/UploadEvidence.jsx";
import Documents from "./pages/Documents.jsx";
import Review from "./pages/Review.jsx";

export default function App() {
  const { pathname } = useLocation();
  const showNav = pathname !== "/login";

  return (
    <>
      {showNav && <Navbar />}
      <div className={showNav ? "container" : ""}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadEvidence />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </div>
    </>
  );
}
