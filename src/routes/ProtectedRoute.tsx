import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Optional loading state
  
  // once the error with OAuth vercel is resolved Add protection logic here
  return  <Outlet /> ;
};

export default ProtectedRoute;
