import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthenticated =
    sessionStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/" replace />;
}