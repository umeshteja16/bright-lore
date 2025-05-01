import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import LoggedIn from "./pages/auth/LoggedIn";
import { ROUTES } from "./config/routes";
import Exam from "./components/Exam/Exam";
import PaperView from "./components/PaperView/PaperView";
import "./App.css";

import Interview from "./components/Interview/Interview"; //Under-Progress
import Stars from "./Themes/ShootingStars/stars";

import { useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";

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
      <Route path={ROUTES.loggedin} element={<LoggedIn />} />
      <Route path={ROUTES.stars} element={<Stars />} />
    </Routes>
  );
}

export default App;
