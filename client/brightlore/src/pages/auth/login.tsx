import React, { useEffect, useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import loginLogo from "../../assets/login-logo.jpg";
import { validateEmail } from "../../utils/helper";
import SignInWithGoogle from "./SignInWithGoogle";
import { auth } from "../auth/Firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) navigate("/profile");
    });
    return () => unsubscribe();
  }, []);

  // ✅ Email/Password Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid Email");
      setErrorType("email");
      return;
    }

    if (!password) {
      setError("Password cannot be empty");
      setErrorType("password");
      return;
    }

    setError(null);
    setErrorType("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err: any) {
      const message = err.message || "Login failed";
      setError(message);

      if (message.toLowerCase().includes("password")) {
        setErrorType("password");
      } else {
        setErrorType("email");
      }

      console.error("Login Error:", message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Login Callback
  const handleGoogleLogin = (user: any) => {
    navigate("/profile");
  };

  return (
    <div className="auth-background min-h-screen flex flex-col items-center justify-center px-4">
      <img
        src={loginLogo}
        alt="Login logo"
        className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto"
      />

      {/* Heading */}
      <div className="flex sm:flex-row items-center text-center sm:text-left gap-2 sm:space-x-6 md:space-x-10 my-5">
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

      {/* Google Login */}
      <SignInWithGoogle onLogin={handleGoogleLogin} />

      {/* Divider */}
      <div className="flex items-center rounded-lg bg-white p-6 sm:max-w-sm lg:max-w-lg w-full">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Email/Password Form */}
      <div className="rounded-lg bg-white p-6 sm:max-w-sm lg:max-w-lg mx-auto w-full">
        <form onSubmit={handleLogin}>
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorType === "email" && (
            <p className="text-red-500 text-xs pb-1">{error}</p>
          )}

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorType === "password" && (
            <p className="text-red-500 text-xs pb-1">{error}</p>
          )}

          <h2 className="text-gray-600 font-bold my-1 text-[13px] sm:text-lg lg:text-[15px]">
            <a href="/forgot-password" className="underline">
              Forgot password?
            </a>
          </h2>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-md px-4 py-2 text-gray-700 sm:text-md sm:font-semibold lg:text-lg lg:font-bold
              hover:shadow-lg hover:scale-105 hover:border-gray-300 hover:bg-gray-100 
              active:scale-95 cursor-pointer transition duration-200 ease-in-out disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
