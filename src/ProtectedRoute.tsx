import { message } from "antd";
import { useEffect } from "react";
import LoadingPage from "./pages/LoadingPage";
import { selectCredentials } from "./features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  selectCredentalProfile,
  setCredentialProfile,
} from "./features/profile/profileSlice";
import { useGetProfileQuery } from "./services/profile/profileServices";

const ProtectedRoute = () => {
  const credentials = useAppSelector(selectCredentials);
  const currentProfile = useAppSelector(selectCredentalProfile);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isInitial = location.pathname === "/initial";

  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProfileQuery(credentials.userId?.toString(), {
    skip: !credentials.token || !credentials.userId,
  });

  useEffect(() => {
    if (profile) {
      dispatch(setCredentialProfile(profile));
      if (isError) {
        message.error("Something went wrong when fetching profile");
      }
    }
  }, [profile, isLoading]);

  if (isLoading || isFetching) return <LoadingPage size="large" />;

  if (!credentials.token)
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  if (!profile?.firstName && !isInitial && !currentProfile?.firstName)
    return <Navigate to="/initial" state={{ from: location }} replace />;
  if (profile?.firstName && isInitial)
    return <Navigate to="/community" state={{ from: location }} replace />;

  return (
    <Outlet
      context={{
        credentialsProfile: {
          refetch,
        },
      }}
    />
  );
};

export default ProtectedRoute;
