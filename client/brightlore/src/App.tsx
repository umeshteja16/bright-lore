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

function App() {
  return (
    <Routes>
      <Route path={ROUTES.landing} element={<Landing />} />
      <Route path={ROUTES.exams} element={<Exam />} />
      <Route path={ROUTES.paper} element={<PaperView />} />
      <Route path={ROUTES.interview} element={<Interview />} />
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.signup} element={<Signup />} />
      <Route path={ROUTES.loggedin} element={<LoggedIn />} />
    </Routes>
  );
}

export default App;
