import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "./Firebase"; // adjust path to your firebase config

// Sign In
export const signInWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};


// Create account with email/password and optional display name
export const signUpWithEmail = async (
  email: string,
  password: string,
  username?: string
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  if (username) {
    await updateProfile(userCredential.user, {
      displayName: username,
    });
  }

  return userCredential;
};
