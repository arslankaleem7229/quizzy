"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import SocialLoginButtons from "@/app/components/Buttons/SocialLoginButtons";
import EmailField from "@/app/components/Inputs/EmailField";
import PasswordField from "@/app/components/Inputs/PasswordField";

const LoginModal = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const identifier = (formData.get("email") as string | null)?.trim() || "";
    const password = (formData.get("password") as string | null)?.trim() || "";

    if (!identifier || !password) {
      setError("Please enter your email/username and password.");
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      action: "login",
      email: identifier,
      password,
    });
    setLoading(false);

    if (res?.error) {
      setError(res.error);
      return;
    }

    router.replace("/latest");
  };

  return (
    <div>
      <div className="flex flex-col gap-5 w-full">
        <SocialLoginButtons provider="google" action="login" />
        <SocialLoginButtons provider="facebook" action="login" />
        <SocialLoginButtons provider="apple" action="login" />
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
        className="btn-primary w-full p-5 bg-gray-100 my-2 text-gray-600 text-md font-semibold"
        onClick={() => router.push("/signup")}
        type="button"
      >
        New to Quizzy? Create an account
      </button>
      <button className="btn-text w-full p-5 pb-10" type="button">
        Login with magic link
      </button>
    </div>
  );
};

export default LoginModal;
