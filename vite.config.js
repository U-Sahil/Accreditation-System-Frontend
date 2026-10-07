import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Frontend runs on http://localhost:5173 (backend CORS already allows this)
export default defineConfig({ plugins: [react()], server: { port: 5173 } });
