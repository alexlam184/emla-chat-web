import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { HashRouter } from "react-router-dom";
import "./i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <HashRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HashRouter>
  </>
);
