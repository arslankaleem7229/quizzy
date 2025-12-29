"use client";
import SocialLoginButtons from "@/components/common/buttons/SocialLoginButtons";
import EmailField from "@/components/common/inputs/EmailField";
import PasswordField from "@/components/common/inputs/PasswordField";

import React from "react";
import { AuthScreenProps } from "../types";
import { useLogin } from "../hooks/useLogin";

export default function LoginScreen({ onSuccess, onChange }: AuthScreenProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const identifier = (formData.get("email") as string | null)?.trim() || "";
    const password = (formData.get("password") as string | null)?.trim() || "";
    await loginWithCredentials({ identifier, password }).then((success) => {
      if (success) {
        onSuccess();
      }
    });
  };

  const { loading, error, loginWithCredentials, loginWithSocial } = useLogin();

  return (
    <div>
      <div className="flex flex-col gap-5 w-full">
        <SocialLoginButtons
          provider="google"
          action="login"
          onClick={() => loginWithSocial({ provider: "google" })}
        />
        <SocialLoginButtons
          provider="facebook"
          action="login"
          onClick={() => loginWithSocial({ provider: "facebook" })}
        />
        <SocialLoginButtons
          provider="apple"
          action="login"
          onClick={() => loginWithSocial({ provider: "apple" })}
        />
      </div>

      <div className="flex items-center w-full my-8">
        <div className="grow border-t border-gray-100"></div>
        <span className="mx-3 text-xs tracking-wider font-semibold text-gray-500">
          or email
        </span>
        <div className="grow border-t border-gray-100"></div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <EmailField
          placeholder="Enter your email address or username"
          type="text"
          name="email"
        />

        <PasswordField placeholder="Enter your password" />

        {error && (
          <p className="text-sm text-red-500 mt-2 text-center" role="alert">
            {error}
          </p>
        )}

        <div className="flex justify-center w-full my-5">
          <span className="text-center mx-3 text-sm tracking-wider font-normal text-gray-500">
            By clicking Log in, you accept Quizzy&apos;s Terms of Service and
            Privacy Policy
          </span>
        </div>
        <button
          type="submit"
          className="btn-primary w-full p-5 my-2 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        onClick={onChange}
        className="btn-primary w-full p-5 bg-gray-100 my-2 text-gray-600 text-md font-semibold"
      >
        New to Quizzy? Create an account
      </button>
      <button className="btn-text w-full p-5 pb-10" type="button">
        Login with magic link
      </button>
    </div>
  );
}
