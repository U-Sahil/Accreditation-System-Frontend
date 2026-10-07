import { useEffect, useState } from "react";
import api, { safe, getError } from "../api/api.js";

export default function Documents() {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/documents")
      .then((res) => setDocs(res.data))
      .catch((err) => setError(getError(err)));
  }, []);

  return (
    <div>
      <h1>Documents</h1>
      {error && <div className="msg error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>File Name</th><th>Department</th>
            <th>Criterion</th><th>Academic Year</th><th>Status</th><th>Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          {docs.length === 0 && <tr><td colSpan="8">No documents found</td></tr>}
          {docs.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{safe(d.title)}</td>
              <td>{safe(d.fileName)}</td>
              <td>{safe(d.department?.name)}</td>
              <td>{safe(d.criterion?.name)}</td>
              <td>{safe(d.academicYear)}</td>
              <td><span className={"badge " + (d.status || "PENDING").toUpperCase()}>{d.status || "PENDING"}</span></td>
              <td>{d.uploadedAt ? new Date(d.uploadedAt).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
