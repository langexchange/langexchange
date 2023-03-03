import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCredentials } from "./features/auth/authSlice";
import { useAppSelector } from "./hooks/hooks";

const ProtectedRoute = () => {
  const credentials = useAppSelector(selectCredentials);
  const location = useLocation();
  const isInitial = location.pathname === "/initial";

  if (credentials?.user && credentials?.token) {
    if (!credentials.user.firstName && !isInitial) {
      return <Navigate to="/initial" state={{ from: location }} replace />;
    } else if (credentials.user.firstName && isInitial) {
      return <Navigate to="/community" state={{ from: location }} replace />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
