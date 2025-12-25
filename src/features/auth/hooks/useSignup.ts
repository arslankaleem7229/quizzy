"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SignupFormData, SocialProvider } from "../types";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const paramsError = searchParams.get("error");
  const [error, setError] = useState<string | null>(
    paramsError === "inactive"
      ? "Your account is inactive. Contact support."
      : null
  );

  const signupWithCredentials = async ({
    email,
    username,
    password,
    confirmPassword,
    dob,
  }: SignupFormData): Promise<boolean> => {
    if (!email || !username || !password || !confirmPassword) {
      setError("All fields are required.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    const { day, month, year } = dob;
    const dobIso = day && month && year ? `${year}-${month}-${day}` : undefined;

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        action: "signup",
        email,
        username,
        name: username,
        dob: dobIso,
        password,
      });
      setLoading(false);

      if (res?.error) {
        setError(res.error);
        return false;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        return false;
      }
    }

    return true;
  };

  //handle signup
  const signupWithProvider = ({ provider }: SocialProvider) => {
    signIn(provider).catch((reason) => {
      setError(reason.message);
    });
  };

  return {
    loading,
    error,
    signupWithCredentials,
    signupWithProvider,
  };
}
