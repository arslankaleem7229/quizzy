"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LoginFormData, SocialProvider } from "../types";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const paramsError = searchParams.get("error");
  const [error, setError] = useState<string | null>(
    paramsError === "inactive"
      ? "Your account is inactive. Contact support."
      : null
  );

  const loginWithCredentials = async ({
    identifier,
    password,
  }: LoginFormData): Promise<boolean> => {
    if (!identifier || !password) {
      setError("Please enter your email/username and password.");
      return false;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        action: "login",
        email: identifier,
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

  const loginWithSocial = ({ provider }: SocialProvider) => {
    signIn(provider).catch((reason) => {
      setError(reason.message);
    });
  };

  return {
    loading,
    error,
    loginWithCredentials,
    loginWithSocial,
  };
}
