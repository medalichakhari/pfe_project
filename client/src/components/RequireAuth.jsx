import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { AuthContext } from "../context/AuthContext";
import { GetUser } from "../lib/fetch";

const RequireAuth = () => {
  const location = useLocation();
  const { user, token } = useContext(AuthContext);
  const { data: userInfo, isLoading } = useQuery(
    ["userInfo", user?.uid, token],
    () => GetUser(user?.uid, token)
  );
  console.log("user", userInfo);
  console.log("token", token);
  console.log("userInfo", user.uid);
  return (
    !isLoading &&
    (user && userInfo ? (
      <Outlet />
    ) : user ? (
      <Navigate to="/useraccount" state={{ from: location }} replace />
    ) : (
      <Navigate to="/signin" state={{ from: location }} replace />
    ))
  );
};

export default RequireAuth;
