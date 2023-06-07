import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const queryString = window.location.search.substring(1);
const params = queryString.split("&").reduce((acc, curr) => {
  const [key, value] = curr.split("=");
  acc[key] = value;
  return acc;
}, {});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App paramData={params} />
  </React.StrictMode>
);
