import { useState } from "react";
import api, { getError } from "../api/api.js";

const emptyForm = {
  title: "", academicYear: "", departmentId: "",
  criterionId: "", subCriterionId: "", userId: "",
};

export default function UploadEvidence() {
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [fileKey, setFileKey] = useState(0); // used to reset the file input
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!file) return setError("Please choose a file.");

    // multipart/form-data
    const data = new FormData();
    data.append("file", file);
    Object.keys(form).forEach((key) => data.append(key, form[key]));

    try {
      setLoading(true);
      await api.post("/api/documents/upload", data);
      setSuccess("Document uploaded successfully!");
      setForm(emptyForm);
      setFile(null);
      setFileKey(fileKey + 1);
    } catch (err) {
      setError(getError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload Evidence</h1>
      {success && <div className="msg success">{success}</div>}
      {error && <div className="msg error">{error}</div>}

      <form className="form" onSubmit={handleSubmit}>
        <label>Document Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />
        <label>Academic Year</label>
        <input name="academicYear" value={form.academicYear} onChange={handleChange} placeholder="2025-2026" required />
        <label>Department ID</label>
        <input name="departmentId" type="number" value={form.departmentId} onChange={handleChange} required />
        <label>Criterion ID</label>
        <input name="criterionId" type="number" value={form.criterionId} onChange={handleChange} required />
        <label>Sub-Criterion ID</label>
        <input name="subCriterionId" type="number" value={form.subCriterionId} onChange={handleChange} required />
        <label>User ID</label>
        <input name="userId" type="number" value={form.userId} onChange={handleChange} required />
        <label>File</label>
        <input key={fileKey} type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
      </form>
    </div>
  );
}
