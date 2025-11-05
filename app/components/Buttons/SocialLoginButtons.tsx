import { signIn } from "next-auth/react";
import React from "react";
import Apple from "../../../public/social_icons/apple.png";
import Facebook from "../../../public/social_icons/facebook.png";
import Google from "../../../public/social_icons/google.png";
import Image from "next/image";

type Provider = "google" | "facebook" | "apple";

const SocialLoginButtons = ({ provider }: { provider: Provider }) => {
  const isGoogle: boolean = provider === "google";
  const isFacebook: boolean = provider === "facebook";
  const isApple: boolean = provider === "apple";
  return (
    <button
      onClick={() => {
        if (isGoogle) signIn("google");
        if (isFacebook) signIn("facebook");
        if (isApple) signIn("apple");
      }}
      className="social-btn-txt flex items-center justify-center gap-3 bg-gray-100 rounded-full py-4 hover:bg-gray-200"
    >
      <Image
        src={isGoogle ? Google : isFacebook ? Facebook : Apple}
        className="flex items-center justify-center gap-2 h-6 w-6"
        alt={provider}
      />
      {isGoogle && <span>Continue with Google</span>}
      {isFacebook && <span>Continue with Facebook</span>}
      {isApple && <span>Continue with Apple</span>}
    </button>
  );
};

export default SocialLoginButtons;
