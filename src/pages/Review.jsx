import { useEffect, useState } from "react";
import api, { safe, getError } from "../api/api.js";

export default function Review() {
  const [docs, setDocs] = useState([]);
  const [comments, setComments] = useState({}); // comments typed per document id
  const [reviewerId, setReviewerId] = useState("1"); // HOD user id (no login yet)
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const loadDocs = () => {
    api.get("/api/documents")
      .then((res) => setDocs(res.data))
      .catch((err) => setError(getError(err)));
  };

  useEffect(loadDocs, []);

  const review = async (documentId, status) => {
    setSuccess("");
    setError("");

    // form-data, same as the backend expects
    const data = new FormData();
    data.append("documentId", documentId);
    data.append("reviewerId", reviewerId);
    data.append("status", status);
    data.append("comments", comments[documentId] || "");

    try {
      await api.post("/api/approvals/review", data);
      setSuccess("Document " + documentId + " " + status.toLowerCase() + " successfully.");
      loadDocs(); // refresh list
    } catch (err) {
      setError(getError(err));
    }
  };

  // only documents that still need review
  const pending = docs.filter((d) => (d.status || "PENDING").toUpperCase() === "PENDING");

  return (
    <div>
      <h1>Review Documents</h1>
      {success && <div className="msg success">{success}</div>}
      {error && <div className="msg error">{error}</div>}

      <div className="reviewer">
        <label>Reviewer (HOD) ID:</label>
        <input type="number" value={reviewerId} onChange={(e) => setReviewerId(e.target.value)} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th><th>File Name</th><th>Department</th><th>Criterion</th>
            <th>Status</th><th>Comments</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pending.length === 0 && <tr><td colSpan="7">No documents pending review</td></tr>}
          {pending.map((d) => (
            <tr key={d.id}>
              <td>{safe(d.title)}</td>
              <td>{safe(d.fileName)}</td>
              <td>{safe(d.department?.name)}</td>
              <td>{safe(d.criterion?.name)}</td>
              <td><span className="badge PENDING">{d.status || "PENDING"}</span></td>
              <td>
                <input
                  placeholder="Comments"
                  value={comments[d.id] || ""}
                  onChange={(e) => setComments({ ...comments, [d.id]: e.target.value })}
                />
              </td>
              <td className="actions">
                <button onClick={() => review(d.id, "APPROVED")}>Approve</button>
                <button className="danger" onClick={() => review(d.id, "REJECTED")}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
