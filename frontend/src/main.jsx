// React core library
import React from "react";

// React DOM for rendering the app in browser
import ReactDOM from "react-dom/client";

// Root component of our application
import App from "./App.jsx";

// Global CSS
import "./styles/global.css";

// Create React root and render the App component
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);