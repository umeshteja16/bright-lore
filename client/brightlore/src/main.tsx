import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./pages/auth/AuthProvider.tsx";

import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
      <Toaster position="bottom-right" />
    </StrictMode>
  </BrowserRouter>
);
