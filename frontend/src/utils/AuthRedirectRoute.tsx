import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const AuthRedirectRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }

  return children;
};
