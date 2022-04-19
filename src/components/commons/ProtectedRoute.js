// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectPath, children }) => {
  const { isSignedIn } = useSelector((store) => store.user.signin);
//   console.log("isSignedIn: ", isSignedIn);

  if (!isSignedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
