import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { UserProvider } from './context/UserContext';
import "./styles/reset.css";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>  {/* Ensure BrowserRouter wraps your App */}
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
</StrictMode>
);
