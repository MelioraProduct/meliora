import React from "react";
import { Navigate } from "react-router-dom";
import useAdminAuth from "../redux/useAdminAuth";

export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to='/admin' />;
  }

  return children;
}
