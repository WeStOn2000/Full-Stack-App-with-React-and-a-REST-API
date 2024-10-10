import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";
import { UserProvider } from './context/UserContext';
import "./global.css";
import "./reset.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <UserProvider>
    <App />
  </UserProvider>,
  </StrictMode>
);
