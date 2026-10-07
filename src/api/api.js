import axios from "axios";

// All requests go to the Spring Boot backend
const api = axios.create({ baseURL: "http://localhost:8080" });

export default api;

// Safely show a value that may be null/empty
export const safe = (value) => (value === null || value === undefined || value === "" ? "-" : value);

// Turn any axios error into a readable message
export function getError(err) {
  if (err.response) {
    const d = err.response.data;
    const msg = typeof d === "string" ? d : d?.message || d?.error || "";
    if (err.response.status === 401 || err.response.status === 403) {
      return "Access denied (" + err.response.status + "). Backend security is blocking this request.";
    }
    return "Server error " + err.response.status + (msg ? ": " + msg : "");
  }
  return "Cannot reach backend at http://localhost:8080. Is Spring Boot running?";
}
