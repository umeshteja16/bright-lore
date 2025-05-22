import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Profile from "./pages/auth/Profile";
import { ROUTES } from "./config/routes";
import Exam from "./components/Exam/Exam";
import PaperView from "./components/PaperView/PaperView";
import "./App.css";

import Interview from "./components/Interview/Interview"; //Under-Progress

import { useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Terms from "./components/Terms";
import PrivacyPolicy from "./components/PrivacyPolicy";

function App() {
  const location = useLocation();
  const previousPath = useRef<string>("");
  useEffect(() => {
    const currentPath = location.pathname;

    // Clear localStorage only if:
    // You leave the "exam" flow (neither on /exam nor /paper/*)
    const isLeavingExamFlow =
      !currentPath.startsWith("/exam") && !currentPath.startsWith("/paper");

    const wasInExamFlow =
      previousPath.current.startsWith("/exam") ||
      previousPath.current.startsWith("/paper"); 

    if (wasInExamFlow && isLeavingExamFlow) {
      localStorage.removeItem("searchQuery");
    }

    // Update previous path
    previousPath.current = currentPath;
  }, [location.pathname]);
  return (
    <Routes>
      <Route path={ROUTES.landing} element={<Landing />} />
      <Route path={ROUTES.exams} element={<Exam />} />
      <Route path={ROUTES.paper} element={<PaperView />} />
      <Route path={ROUTES.interview} element={<Interview />} />
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.signup} element={<Signup />} />
      <Route path={ROUTES.profile} element={<Profile />} />
      <Route path={ROUTES.forgotpassword} element={<ForgotPassword />} />
      <Route path={ROUTES.termsandconditions} element={<Terms />} />
      <Route path={ROUTES.privacypolicy} element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;
