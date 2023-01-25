import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticationLayout from "./layouts/authentications/AuthenticationLayout";
import AboutPage from "./pages/abouts/AboutPage";
import ForgotPasswordPage from "./pages/authentications/ForgotPasswordPage";
import SigninPage from "./pages/authentications/SigninPage";
import SignupPage from "./pages/authentications/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import WelcomePage from "./pages/welcomes/WelcomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/abouts" element={<AboutPage />} />
          <Route element={<AuthenticationLayout />}>
            <Route path="/sign-in" element={<SigninPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
