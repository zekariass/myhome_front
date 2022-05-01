// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ redirectPath, children }) => {
  const { isSignedIn } = useSelector((store) => store.user.signin);
  // console.log("CHILDREN: ", children);
  const location = useLocation();

  if (!isSignedIn) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
