import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import { ROUTES } from "./config/routes";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Home />} />
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.signup} element={<Signup />} />
    </Routes>
  );
}

export default App;
