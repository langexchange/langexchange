import { Button, message, notification } from "antd";
import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { setLanguages } from "./features/languages/languageSlice";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import AppSignedInLayout from "./layouts/AppSignedInLayout";
import AuthenticationLayout from "./layouts/authentications/AuthenticationLayout";
import NoSignedInLayout from "./layouts/NoSignedInLayout";
import PartnerLayout from "./layouts/partners/PartnerLayout";
import YourPartnerLayout from "./layouts/partners/YourPartnerLayout";
import ProfileLayout from "./layouts/profile/ProfileLayout";
import MainVocabularyLayout from "./layouts/vocabularies/MainVocabularyLayout";
import PracticeVocabularyLayout from "./layouts/vocabularies/PracticeVocabularyLayout";
import AboutPage from "./pages/abouts/AboutPage";
import ForgotPasswordPage from "./pages/authentications/ForgotPasswordPage";
import SigninPage from "./pages/authentications/SigninPage";
import SignupPage from "./pages/authentications/SignupPage";
import CommunityPage from "./pages/communitys/CommunityPage";
import InitialPage from "./pages/InitialPage";
import LoadingPage from "./pages/LoadingPage";
import NotFoundPage from "./pages/NotFoundPage";
import PartnerDetailPage from "./pages/partners/PartnerDetailPage";
import PartnerExplorePage from "./pages/partners/PartnerExplorePage";
import PartnerRequestsPage from "./pages/partners/PartnerRequestsPage";
import YourPartnersPage from "./pages/partners/YourPartnersPage";
import PostDetailPage from "./pages/posts/PostDetailPage";
import ProfileSettingsPage from "./pages/profiles/ProfileSettingsPage";
import ProfileVocabulariesPage from "./pages/profiles/ProfileVocabulariePage";
import ProfileWallPage from "./pages/profiles/ProfileWallPage";
import VocabularyCreatePage from "./pages/vocabularies/VocabularyCreatePage";
import VocabularyDetailPage from "./pages/vocabularies/VocabularyDetailPage";
import VocabularyEditPage from "./pages/vocabularies/VocabularyEditPage";
import VocabularyExploresPage from "./pages/vocabularies/VocabularyExploresPage";
import VocabularyPracticeOverviewPage from "./pages/vocabularies/VocabularyPracticeOverviewPage";
import VocabularyPracticePage from "./pages/vocabularies/VocabularyPracticePage";
import YourVocabularyPage from "./pages/vocabularies/YourVocabularyPage";
import WelcomePage from "./pages/welcomes/WelcomePage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { useGetLanguagesQuery } from "./services/languages/languageService";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { selectCredentials } from "./features/auth/authSlice";

const App: React.FC = () => {
  const location = useLocation();
  const credential = useAppSelector(selectCredentials);
  const [connection, setConnection] = useState<null | HubConnection>(null);
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("http://localhost:5003/hub/notification")
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (message) => {
            notification.open({
              message: "New Notification",
              description: message,
            });
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  const joinGroup = async () => {
    if (connection) await connection.send("AddToGroup", credential?.userId);
  };

  useEffect(() => {
    if (connection?.state === "Connected") joinGroup();
  }, [connection?.state, credential?.userId]);

  const {
    data: languages,
    isFetching,
    isError,
  } = useGetLanguagesQuery(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (languages) {
      dispatch(setLanguages(languages));
      if (isError) {
        message.error("Something went wrong when fetching languages");
      }
    }
  }, [languages, isFetching, isError]);

  return (
    <Suspense fallback={<LoadingPage size="large" />}>
      <div className="App">
        <Routes location={location}>
          <Route element={<PublicRoute />}>
            <Route element={<NoSignedInLayout />}>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/abouts" element={<AboutPage />} />
            </Route>
            <Route element={<AuthenticationLayout />}>
              <Route path="/sign-in" element={<SigninPage />} />
              <Route path="/sign-up" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/initial" element={<InitialPage />} />
            <Route element={<AppSignedInLayout />}>
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/partners">
                <Route element={<PartnerLayout />}>
                  <Route index element={<PartnerExplorePage />} />
                  <Route path="explores" element={<PartnerExplorePage />} />
                  <Route path="requests" element={<PartnerRequestsPage />} />
                </Route>
                <Route element={<YourPartnerLayout />}>
                  <Route path="all" element={<YourPartnersPage />} />
                  <Route path=":id" element={<PartnerDetailPage />} />
                </Route>
              </Route>
              <Route path="/vocabularies" element={<MainVocabularyLayout />}>
                <Route index element={<VocabularyExploresPage />} />
                <Route path="explores" element={<VocabularyExploresPage />} />
                <Route path="yours" element={<YourVocabularyPage />} />
                <Route path="practice" element={<PracticeVocabularyLayout />}>
                  <Route index element={<VocabularyPracticeOverviewPage />} />
                  <Route path=":id" element={<VocabularyPracticePage />} />
                </Route>

                <Route path=":vocabularySetId">
                  <Route index element={<VocabularyDetailPage />} />
                  <Route path="edit" element={<VocabularyEditPage />} />
                </Route>
                <Route path="create" element={<VocabularyCreatePage />} />
              </Route>
              <Route path="/profile/:id" element={<ProfileLayout />}>
                <Route index element={<ProfileWallPage />} />
                <Route path="wall" element={<ProfileWallPage />} />
                <Route
                  path="vocabularies"
                  element={<ProfileVocabulariesPage />}
                />
                <Route path="settings" element={<ProfileSettingsPage />} />
              </Route>
              <Route path="/posts/:id" element={<PostDetailPage />} />
            </Route>
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
