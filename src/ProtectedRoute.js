import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuth = localStorage.getItem("isAuthenticated");

  return isAuth === "true"
    ? <Outlet />
    : <Navigate to="/" replace />;
}