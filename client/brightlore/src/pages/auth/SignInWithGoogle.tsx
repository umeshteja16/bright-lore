import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "../auth/Firebase/Firebase";

interface Props {
  onLogin: (user: any) => void;
}

const SignInWithGoogle: React.FC<Props> = ({ onLogin }) => {
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      onLogin(user); // ✅ Notify parent
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center rounded-lg bg-white p-6 sm:max-w-sm lg:max-w-lg w-full">
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-md px-4 py-2 text-md text-gray-700 font-medium hover:shadow-lg hover:border-gray-400 active:scale-95 cursor-pointer transition"
        onClick={googleLogin}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google logo"
          className="w-5 h-5"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default SignInWithGoogle;
