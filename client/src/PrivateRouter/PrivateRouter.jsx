import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Login from "../components/Login";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user) {
    return children;
  }
  return <Login></Login>;
};

export default PrivateRouter;
