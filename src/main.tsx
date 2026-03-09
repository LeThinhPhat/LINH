import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          success: { style: { background: "#18181b", color: "#fff" } },
          error: { style: { background: "#dc2626", color: "#fff" } },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
);
