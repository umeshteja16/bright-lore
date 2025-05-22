import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import loginLogo from "../../assets/login-logo.jpg";
import { auth } from "../auth/Firebase/Firebase";
import { validateEmail } from "../../utils/helper";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email.");
    } catch (err: any) {
      setError("Failed to send reset email. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-background min-h-screen flex flex-col items-center justify-center px-4">
      <img
        src={loginLogo}
        alt="Forgot Password Logo"
        className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto"
      />

      {/* Heading */}
      <div className="flex flex-col items-center text-center gap-2 sm:space-y-2 my-5">
        <h1 className="text-xl sm:text-2xl lg:text-4xl text-gray-700 font-semibold">
          Forgot Password
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-md">
          Enter your registered email and we’ll send you a link to reset your password.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-lg bg-white p-6 sm:max-w-sm lg:max-w-lg w-full">
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm sm:text-base mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
            {error && (
              <p className="text-red-500 text-xs pt-1">{error}</p>
            )}
            {message && (
              <p className="text-green-600 text-xs pt-1">{message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-md px-4 py-2 text-gray-700 sm:text-md sm:font-semibold lg:text-lg lg:font-bold
              hover:shadow-lg hover:scale-105 hover:border-gray-300 hover:bg-gray-100 
              active:scale-95 cursor-pointer transition duration-200 ease-in-out disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/login" className="text-sm text-blue-600 underline">
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
