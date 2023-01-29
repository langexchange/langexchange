import { Route, Routes, useLocation } from "react-router-dom";
import AppSignedInLayout from "./layouts/AppSignedInLayout";
import AuthenticationLayout from "./layouts/authentications/AuthenticationLayout";
import NoSignedInLayout from "./layouts/NoSignedInLayout";
import AboutPage from "./pages/abouts/AboutPage";
import ForgotPasswordPage from "./pages/authentications/ForgotPasswordPage";
import SigninPage from "./pages/authentications/SigninPage";
import SignupPage from "./pages/authentications/SignupPage";
import CommunityPage from "./pages/communitys/CommunityPage";
import NotFoundPage from "./pages/NotFoundPage";
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
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
