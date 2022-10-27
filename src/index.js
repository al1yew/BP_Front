import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.css';
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./style.css";
import Assessment from "./pages/Assessment";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<App />}>
          <Route path="assessment" element={<Assessment />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);
