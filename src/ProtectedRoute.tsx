import { message, Spin } from "antd";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCredentials, setCredentials } from "./features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { useGetProfileMutation } from "./services/profile/profileServices";

const ProtectedRoute = () => {
  const credentials = useAppSelector(selectCredentials);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isInitial = location.pathname === "/initial";
  const [getProfile, { isLoading }] = useGetProfileMutation();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await getProfile(credentials.user.id).unwrap();
        dispatch(
          setCredentials({
            ...credentials,
            user: {
              ...credentials.user,
              firstName: profile.firstName,
              lastName: profile.lastName,
            },
          })
        );
      } catch (error) {
        console.log(error);
        message.error("Oops! Something went wrong. Please try again.");
      }
    }
    fetchProfile();
  }, []);

  if (isLoading) return <Spin size="large" spinning={isLoading} />;

  if (!credentials.user || !credentials.token)
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  if (!credentials.user.firstName && !isInitial)
    return <Navigate to="/initial" state={{ from: location }} replace />;
  if (credentials.user.firstName && isInitial)
    return <Navigate to="/community" state={{ from: location }} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
