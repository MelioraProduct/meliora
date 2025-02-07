import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../redux/useAuth";

export default function ProtectedRoute({ children }) {
  const { auth } = useAuth();

  if (auth.isAuthenticated === false) {
    return <Navigate to='/signin' />;
  }

  return children;
}
