import { Route, Routes, useLocation } from "react-router-dom";
import AppSignedInLayout from "./layouts/AppSignedInLayout";
import AuthenticationLayout from "./layouts/authentications/AuthenticationLayout";
import ChatLayout from "./layouts/chats/ChatLayout";
import NoSignedInLayout from "./layouts/NoSignedInLayout";
import PartnerLayout from "./layouts/partners/PartnerLayout";
import YourPartnerLayout from "./layouts/partners/YourPartnerLayout";
import StudySpaceLayout from "./layouts/studySpace/StudySpaceLayout";
import AboutPage from "./pages/abouts/AboutPage";
import ForgotPasswordPage from "./pages/authentications/ForgotPasswordPage";
import SigninPage from "./pages/authentications/SigninPage";
import SignupPage from "./pages/authentications/SignupPage";
import ChatPage from "./pages/chats/ChatPage";
import CommunityPage from "./pages/communitys/CommunityPage";
import NotFoundPage from "./pages/NotFoundPage";
import PartnerDetailPage from "./pages/partners/PartnerDetailPage";
import PartnerExplorePage from "./pages/partners/PartnerExplorePage";
import PartnerRequestsPage from "./pages/partners/PartnerRequestsPage";
import YourPartnersPage from "./pages/partners/YourPartnersPage";
import StudySpaceExplorePage from "./pages/studySpaces/StudySpaceExplorePage";
import StudySpaceOwnPage from "./pages/studySpaces/StudySpaceOwnPage";
import StudySpacePage from "./pages/studySpaces/StudySpacePage";
import WelcomePage from "./pages/welcomes/WelcomePage";

function App() {
  const location = useLocation();

  return (
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
          <Route path="/chat" element={<ChatLayout />}>
            <Route index element={<ChatPage />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
