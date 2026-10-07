import { useEffect, useState } from "react";
import api, { safe, getError } from "../api/api.js";

export default function Dashboard() {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/documents")
      .then((res) => setDocs(res.data))
      .catch((err) => setError(getError(err)));
  }, []);

  const count = (s) => docs.filter((d) => (d.status || "PENDING").toUpperCase() === s).length;
  const recent = [...docs].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <div className="msg error">{error}</div>}

      <div className="cards">
        <div className="card"><p>Total Documents</p><h2>{docs.length}</h2></div>
        <div className="card"><p>Pending</p><h2>{count("PENDING")}</h2></div>
        <div className="card"><p>Approved</p><h2>{count("APPROVED")}</h2></div>
        <div className="card"><p>Rejected</p><h2>{count("REJECTED")}</h2></div>
      </div>

      <h3>Recent Documents</h3>
      <table>
        <thead>
          <tr><th>ID</th><th>Title</th><th>Department</th><th>Status</th></tr>
        </thead>
        <tbody>
          {recent.length === 0 && <tr><td colSpan="4">No documents found</td></tr>}
          {recent.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{safe(d.title)}</td>
              <td>{safe(d.department?.name)}</td>
              <td><span className={"badge " + (d.status || "PENDING").toUpperCase()}>{d.status || "PENDING"}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
