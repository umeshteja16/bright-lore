import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import NameInput from "./NameInput";
import loginLogo from "../../assets/login-logo.jpg";
import { validateEmail } from "../../utils/helper";
import SignInWithGoogle from "./SignInWithGoogle";
import { signUpWithEmail } from "./Firebase/FirebaseAuth";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorType, setErrorType] = useState("");
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.length < 6 || username.length > 18) {
      setError("Name must be 6 to 18 characters long");
      setErrorType("name");
      return;
    }

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

    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      setErrorType("terms");
      return;
    }

    setErrorType("");
    setError("");

    try {
      const userCredential = await signUpWithEmail(email, password, username);
      console.log("Signed up:", userCredential.user);
      navigate("/profile"); // ✅ Redirect to profile after signup
    } catch (err: any) {
      console.error("Signup Error:", err.message);
      setError(err.message);
      setErrorType("firebase");
    }
  };

  return (
    <div className="auth-background min-h-screen flex flex-col items-center justify-center px-4">
      <img
        src={loginLogo}
        alt="Login logo"
        className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto"
      />

      <div className="flex sm:flex-row items-center text-center sm:text-left gap-2 md:space-x-3 my-5">
        <h1 className="sm:text-2xl lg:text-4xl text-gray-700 sm:font-medium lg:font-semibold">
          Let's get started
        </h1>
        <h2 className="text-gray-600 mt-3 sm:text-base lg:text-lg">
          Have an account?{" "}
          <a href="/login" className="underline">
            Sign in.
          </a>
        </h2>
      </div>

      <SignInWithGoogle onLogin={() => {}} />

      <div className="flex items-center rounded-lg bg-white p-6 sm:max-w-sm lg:max-w-lg w-full">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      <div className="rounded-lg bg-white p-6 sm:max-w-sm lg:max-w-lg mx-auto w-full">
        <form onSubmit={handleSignup}>
          <NameInput
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errorType === "name" && (
            <p className="text-red-500 text-xs pb-1">{error}</p>
          )}

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

          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="accent-gray-600"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="/terms-and-conditions" className="underline font-bold">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" className="underline font-bold">
                Privacy Policy
              </a>
            </label>
          </div>
          {errorType === "terms" && (
            <p className="text-red-500 text-xs pb-1">{error}</p>
          )}

          {errorType === "firebase" && (
            <p className="text-red-500 text-xs pt-2 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-md mt-8 px-4 py-2 text-gray-700 sm:text-md sm:font-semibold lg:text-lg lg:font-bold
              hover:shadow-lg hover:scale-105 hover:border-gray-300 hover:bg-gray-100 
              active:scale-95 cursor-pointer transition duration-200 ease-in-out"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
