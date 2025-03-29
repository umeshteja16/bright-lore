import React, { useState, useEffect } from "react";
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
        <img
          src={logo}
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover cursor-pointer"
          alt="Logo"
        />

        {/* Nav Links */}
        <div className="flex border border-color rounded-full overflow-hidden h-12 sm:h-14">
          <button className="bg-secondary text-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg text-center cursor-pointer hover:bg-primary hover:text-white font-bold transition duration-200">
            Exam
          </button>
          <button className="bg-secondary text-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg text-center cursor-pointer hover:bg-primary hover:text-white font-bold transition duration-200">
            InterviewPrep
          </button>
        </div>
      </div>
      <div className="flex space-x-5">
        {/* Ignite Learning Button */}
        <div className="mt-2 sm:mt-0 flex border border-color bg-main rounded-full overflow-hidden h-12 sm:h-14 font-bold hover:bg-primary hover:text-white transition">
          <h1 className="bg-secondary text-primary flex items-center justify-center w-full h-full px-4 sm:px-6 text-sm sm:text-lg text-center cursor-pointer">
            Ignite Learning
          </h1>
        </div>

        {/* Contribute Button */}
        <div className="mt-2 sm:mt-0 flex border border-color bg-main rounded-full overflow-hidden h-12 sm:h-14 font-bold hover:bg-secondary hover:bg-opacity-80 transition">
          <h1 className="bg-secondary text-primary flex items-center justify-center w-full h-full px-4 sm:px-6 text-sm sm:text-lg text-center cursor-pointer">
            Contribute
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
