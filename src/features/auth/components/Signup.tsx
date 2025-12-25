"use client";

import { useState } from "react";
import SocialLoginButtons from "@/components/common/buttons/SocialLoginButtons";
import DOBDropdown from "@/components/common/inputs/DOBDropdown";
import EmailField from "@/components/common/inputs/EmailField";
import PasswordField from "@/components/common/inputs/PasswordField";
import { AuthScreenProps } from "../types";
import { useSignup } from "../hooks/useSignup";

export default function SignupScreen({ onChange, onSuccess }: AuthScreenProps) {
  const [dob, setDob] = useState({ day: "", month: "", year: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string | null)?.trim() || "";
    const username = (formData.get("username") as string | null)?.trim() || "";
    const password = (formData.get("password") as string | null)?.trim() || "";
    const confirmPassword =
      (formData.get("confirmPassword") as string | null)?.trim() || "";
    const success = await signupWithCredentials({
      email,
      username,
      password,
      confirmPassword,
      dob,
    });
    if (success) {
      onSuccess();
    }
  };

  const { loading, error, signupWithCredentials, signupWithProvider } =
    useSignup();

  return (
    <div>
      <div className="space-x-15">
        <div className="flex flex-col gap-5 w-full">
          <SocialLoginButtons
            provider="google"
            action="signup"
            onClick={() => signupWithProvider({ provider: "google" })}
          />
          <SocialLoginButtons
            provider="facebook"
            action="signup"
            onClick={() => signupWithProvider({ provider: "facebook" })}
          />
          <SocialLoginButtons
            provider="apple"
            action="signup"
            onClick={() => signupWithProvider({ provider: "apple" })}
          />
        </div>
      </div>

      <div className="flex items-center w-full my-8">
        <div className="grow border-t border-gray-100"></div>
        <span className="mx-3 text-xs tracking-wider font-semibold text-gray-500">
          or email
        </span>
        <div className="grow border-t border-gray-100"></div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <DOBDropdown value={dob} onChange={setDob} />

        <EmailField
          placeholder="Enter your email address"
          label="Email"
          name="email"
        />

        <EmailField
          placeholder="Enter your username"
          label="Username"
          name="username"
          type="text"
        />

        <PasswordField
          placeholder="Enter your password"
          label="Password"
          name="password"
        />

        <PasswordField
          placeholder="Confirm your password"
          label="Confirm Password"
          name="confirmPassword"
        />

        {error && (
          <p className="text-center text-sm text-red-500 mt-2" role="alert">
            {error}
          </p>
        )}

        <div className="flex justify-center w-full my-5">
          <span className="text-center mx-3 text-sm tracking-wider font-normal text-gray-500">
            By clicking Sign up, you accept Quizzy&apos;s Terms of Service and
            Privacy Policy
          </span>
        </div>
        <button
          type="submit"
          className="btn-primary w-full p-5 my-2 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <button
        className="btn-primary w-full p-5 bg-gray-100 my-2 text-gray-600 text-md font-semibold"
        onClick={onChange}
        type="button"
      >
        Already have an account? Log in
      </button>
    </div>
  );
}
