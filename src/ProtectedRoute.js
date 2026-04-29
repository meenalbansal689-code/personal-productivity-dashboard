import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("isAuthenticated");

  return user === "true"
    ? <Outlet />
    : <Navigate to="/" replace />;
};

export default ProtectedRoute;