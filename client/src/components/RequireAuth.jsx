import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { AuthContext } from "../context/AuthContext";
import { GetUser } from "../lib/fetch";

const RequireAuth = () => {
  const location = useLocation();
  const { user, token } = useContext(AuthContext);
  console.log(user);
  const { data: userInfo, isLoading } = useQuery(
    ["userInfo", user?.user_id, token],
    () => GetUser(user?.user_id, token)
  );
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
