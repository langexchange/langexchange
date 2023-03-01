import { Spin } from "antd";
import { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AppSignedInLayout from "./layouts/AppSignedInLayout";
import AuthenticationLayout from "./layouts/authentications/AuthenticationLayout";
import NoSignedInLayout from "./layouts/NoSignedInLayout";
import PartnerLayout from "./layouts/partners/PartnerLayout";
import YourPartnerLayout from "./layouts/partners/YourPartnerLayout";
import ProfileLayout from "./layouts/profile/ProfileLayout";
import StudySpaceLayout from "./layouts/studySpace/StudySpaceLayout";
import MainVocabularyLayout from "./layouts/vocabularies/MainVocabularyLayout";
import PracticeVocabularyLayout from "./layouts/vocabularies/PracticeVocabularyLayout";
import AboutPage from "./pages/abouts/AboutPage";
import ForgotPasswordPage from "./pages/authentications/ForgotPasswordPage";
import SigninPage from "./pages/authentications/SigninPage";
import SignupPage from "./pages/authentications/SignupPage";
import CommunityPage from "./pages/communitys/CommunityPage";
import InitialPage from "./pages/InitialPage";
import NotFoundPage from "./pages/NotFoundPage";
import PartnerDetailPage from "./pages/partners/PartnerDetailPage";
import PartnerExplorePage from "./pages/partners/PartnerExplorePage";
import PartnerRequestsPage from "./pages/partners/PartnerRequestsPage";
import YourPartnersPage from "./pages/partners/YourPartnersPage";
import ProfileSettingsPage from "./pages/profiles/ProfileSettingsPage";
import ProfileVocabulariesPage from "./pages/profiles/ProfileVocabulariePage";
import ProfileWallPage from "./pages/profiles/ProfileWallPage";
import StudySpaceExplorePage from "./pages/studySpaces/StudySpaceExplorePage";
import StudySpaceOwnPage from "./pages/studySpaces/StudySpaceOwnPage";
import StudySpacePage from "./pages/studySpaces/StudySpacePage";
import VocabularyCreatePage from "./pages/vocabularies/VocabularyCreatePage";
import VocabularyDetailPage from "./pages/vocabularies/VocabularyDetailPage";
import VocabularyExploresPage from "./pages/vocabularies/VocabularyExploresPage";
import VocabularyPracticeOverviewPage from "./pages/vocabularies/VocabularyPracticeOverviewPage";
import VocabularyPracticePage from "./pages/vocabularies/VocabularyPracticePage";
import YourVocabularyPage from "./pages/vocabularies/YourVocabularyPage";
import WelcomePage from "./pages/welcomes/WelcomePage";
import ProtectedRoute from "./ProtectedRoute";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <Suspense
      fallback={
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      }
    >
      <div className="App">
        <Routes location={location}>
          <Route element={<NoSignedInLayout />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/abouts" element={<AboutPage />} />
          </Route>
          <Route element={<AuthenticationLayout />}>
            <Route path="/sign-in" element={<SigninPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/initial" element={<InitialPage />} />
            <Route element={<AppSignedInLayout />}>
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/study-spaces">
                <Route element={<StudySpaceLayout />}>
                  <Route index element={<StudySpacePage />} />
                  <Route path="recent" element={<StudySpacePage />} />
                  <Route path="all" element={<StudySpaceOwnPage />} />
                  <Route path="own" element={<StudySpaceOwnPage />} />
                  <Route path="joined" element={<StudySpaceOwnPage />} />
                </Route>
                <Route path="explores" element={<StudySpaceExplorePage />} />
              </Route>
              <Route path="/partners">
                <Route element={<PartnerLayout />}>
                  <Route index element={<PartnerExplorePage />} />
                  <Route path="explores" element={<PartnerExplorePage />} />
                  <Route path="requests" element={<PartnerRequestsPage />} />
                </Route>
                <Route element={<YourPartnerLayout />}>
                  <Route path="all" element={<YourPartnersPage />} />
                  <Route path="detail" element={<PartnerDetailPage />} />
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
                <Route path="details" element={<VocabularyDetailPage />} />
                <Route path="create" element={<VocabularyCreatePage />} />
              </Route>
              <Route path="/:userId" element={<ProfileLayout />}>
                <Route index element={<ProfileWallPage />} />
                <Route path="wall" element={<ProfileWallPage />} />
                <Route
                  path="vocabularies"
                  element={<ProfileVocabulariesPage />}
                />
                <Route path="settings" element={<ProfileSettingsPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
