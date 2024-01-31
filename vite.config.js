import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: "./src",
    base: "",
    plugins: [reactRefresh()],
  };
});
