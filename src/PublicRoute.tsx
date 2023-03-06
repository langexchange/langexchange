import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCredentials } from "./features/auth/authSlice";
import { useAppSelector } from "./hooks/hooks";

const PublicRoute = () => {
  const credentials = useAppSelector(selectCredentials);
  const location = useLocation();

  return credentials?.userId && credentials?.token ? (
    <Navigate to="/community" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
