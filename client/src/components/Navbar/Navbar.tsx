import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.jpg";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  return (
    <div
      className={`
        fixed top-2 left-0 w-full flex flex-wrap items-center justify-between
        bg-transparent z-50 transition-transform duration-300
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        px-4 py-2 sm:px-6 lg:px-12
      `}
    >
      {/* Logo and Nav Items */}
      <div className="flex items-center gap-4 flex-wrap">
        <img src={logo} className="logo" alt="Logo" />

        {/* Nav Links */}
        <div className="flex border border-color rounded-full overflow-hidden h-12 sm:h-14">
          <NavLink
            to="/exams"
            className={`${
              isActive("/exams") ? "bg-primary" : "bg-secondary text-primary"
            } px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg text-center cursor-pointer font-bold transition nav-hover duration-200`}
          >
            Exam
          </NavLink>
          <NavLink
            to="/interview"
            className={`${
              isActive("/interview")
                ? "bg-primary"
                : "bg-secondary text-primary"
            } px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg text-center cursor-pointer font-bold transition nav-hover duration-200`}
          >
            InterviewPrep
          </NavLink>
        </div>
      </div>
      <div className="flex space-x-5">
        {/* Ignite Learning Button */}
        <div className="mt-2 sm:mt-0 flex border border-color bg-main rounded-full overflow-hidden h-12 sm:h-14 font-bold transition">
          <NavLink
            to="/exams"
            className="bg-secondary text-primary flex items-center justify-center w-full h-full px-4 sm:px-6 text-sm sm:text-lg nav-hover text-center sm:h-14 cursor-pointer font-bold rounded-full home-btn-1 border home-hover"
          >
            Start Exploring
          </NavLink>
        </div>

        {/* Contribute Button */}
        <div className="mt-2 sm:mt-0 flex border border-color bg-main rounded-full overflow-hidden h-12 sm:h-14 font-bold transition">
          <NavLink
            to="/login"
            className="bg-secondary text-primary flex items-center justify-center w-full h-full px-4 sm:px-6 text-sm sm:text-lg nav-hover text-center cursor-pointer"
          >
            Join BrightLore
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
