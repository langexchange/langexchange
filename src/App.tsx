import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/abouts/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import WelcomePage from "./pages/welcomes/WelcomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/abouts" element={<AboutPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
