import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Get URL search params and convert to object
const params = Object.fromEntries(new URLSearchParams(window.location.search));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App paramData={params} />
  </React.StrictMode>
);
