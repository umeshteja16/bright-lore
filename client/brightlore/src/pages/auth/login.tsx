import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./passwordInput";
import EmailInput from "./EmailInput";
import loginLogo from "../../assets/login-logo.jpg";
const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async () => {
    //HandleLogin
    //Login API
  };
  return (
    <div className="auth-background min-h-screen flex flex-col items-center justify-center px-4">
      <img
        src={loginLogo}
        alt="Login logo"
        className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto"
      />
      <div className="flex items-center rounded-lg bg-white p-6 sm:max-w-sm lg:max-w-lg w-full">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-md px-4 py-2 text-md text-gray-700 font-medium hover:shadow-lg hover:border-gray-400 active:scale-95 cursor-pointer transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </div>
      <div className="flex items-center rounded-lg bg-white p-6 sm:max-w-sm lg:max-w-lg w-full">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <div className="flex sm:flex-row items-center text-center sm:text-left gap-2 sm:space-x-6 md:space-x-10 mb-2">
        <h1 className="sm:text-2xl lg:text-4xl text-gray-700 sm:font-medium lg:font-semibold">
          Sign in
        </h1>
        <h2 className="text-gray-600 mt-3 sm:text-base lg:text-lg">
          New to BrightLore?{" "}
          <a href="/signup" className="underline">
            Let's get started.
          </a>
        </h2>
      </div>

      <div className="rounded-lg bg-white p-6 sm:max-w-sm lg:max-w-lg mx-auto w-full">
        <form onSubmit={handleLogin}>
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </div>
      <div className="flex items-center rounded-lg bg-white p-6 sm:max-w-sm lg:max-w-lg w-full">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-md px-4 py-2 text-gray-700 sm:text-md sm:font-semibold lg:text-lg lg:font-bold
      hover:shadow-lg hover:scale-105 hover:border-gray-300 hover:bg-gray-100 
      active:scale-95 cursor-pointer transition duration-200 ease-in-out"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default login;
