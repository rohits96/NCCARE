import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  try {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      return <Navigate to="/login" replace />;
    }
    return children;
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
}
