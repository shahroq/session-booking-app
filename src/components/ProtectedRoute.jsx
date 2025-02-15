// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ roles = [] }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Optionally, render a loading indicator
    return <div>Loading...</div>;
  }

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and the user's role is not in the allowed roles, redirect or show unauthorized
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // If authenticated (and authorized), render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;
