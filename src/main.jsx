import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import {GoogleOAuthProvider} from "@react-oauth/google"
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
    <AuthProvider>
      <BrowserRouter>
         <Toaster position="top-center" />
        <App />
      </BrowserRouter>
    </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
