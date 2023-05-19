import { message } from "antd";
import { useState, useEffect } from "react";
import LoadingPage from "./pages/LoadingPage";
import { logout, selectCredentials } from "./features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  selectCredentalProfile,
  setCredentialProfile,
} from "./features/profile/profileSlice";
import { useGetProfileQuery } from "./services/profile/profileServices";
import { hideChat, initChat, loginChat, showChat } from "./chat";
import { selectCurrentChatStatus, setChatStatus } from "./features/chatSlice";

const ProtectedRoute = () => {
  console.log("Dont know how this function will call");
  const credentials = useAppSelector(selectCredentials);
  console.log(credentials);
  const currentProfile = useAppSelector(selectCredentalProfile);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isInitial = location.pathname === "/initial";
  const [isChatInit, setIsChatInit] = useState(false);
  const chatStatus = useAppSelector(selectCurrentChatStatus);

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
    }
    if (isError) {
      dispatch(logout());
    }
  }, [profile, isLoading, isFetching]);

  useEffect(() => {
    if (chatStatus || !window.converse) return;
    // if (window.location.pathname === "/initial") return;

    initChat();
    dispatch(setChatStatus(true));
  }, [window.converse]);

  if (isLoading) return <LoadingPage size="large" />;

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
