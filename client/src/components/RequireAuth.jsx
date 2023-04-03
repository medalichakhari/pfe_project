import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { user } = useAuth();
  const hasAllowedRole = allowedRoles?.some((role) =>
    user.roles.includes(role)
  );
  return user &&
    user.roles &&
    (hasAllowedRole || (!allowedRoles && user.roles.includes("user"))) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/useraccount" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
