import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RequireAuth = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  console.log("user", user);
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signup" state={{ from: location }} replace />
  );
};

export default RequireAuth;

