import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Local dev serves from /, production build from /pmm-x-eran/ (GitHub Pages)
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/pmm-x-eran/" : "/",
}));
