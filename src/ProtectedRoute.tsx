import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentToken } from "./features/auth/authSlice";
import { useAppSelector } from "./hooks/hooks";

const ProtectedRoute = () => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
