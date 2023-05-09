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
import { initChat, login } from "./chat";

const ProtectedRoute = () => {
  console.log("Dont know how this function will call");
  const credentials = useAppSelector(selectCredentials);
  console.log(credentials)
  const currentProfile = useAppSelector(selectCredentalProfile);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isInitial = location.pathname === "/initial";
  const [isChatInit, setIsChatInit] = useState(false)

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
    if (isChatInit || !window.converse) return;
    console.log("Init chat")
    initChat();
    setIsChatInit(true)
  }, [isChatInit, window.converse]);

  if (isLoading) return <LoadingPage size="large" />;

  
  if (!credentials.token)
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  if (!profile?.firstName && !isInitial && !currentProfile?.firstName)
    return <Navigate to="/initial" state={{ from: location }} replace />;
  if (profile?.firstName && isInitial){
    if(isChatInit){
      console.log("Login user with initialized config")
      login(credentials.jid, credentials.token)
    }
    return <Navigate to="/community" state={{ from: location }} replace />;
  }
    

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
