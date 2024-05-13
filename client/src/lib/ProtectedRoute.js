// ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import useAuthToken from "./useAuthToken";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = useAuthToken();

  return isAuthenticated ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
