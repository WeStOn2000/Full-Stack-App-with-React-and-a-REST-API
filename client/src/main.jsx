 /**
   * main file that renders the components that are passed to app display on to the Dom 
   */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { UserProvider } from './context/UserContext';
import "./styles/reset.css";
import "./styles/global.css";
//Rendering to the dom 
createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>  
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
</StrictMode>
);
