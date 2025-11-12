import { signIn } from "next-auth/react";
import Image from "next/image";
import Apple from "../../../public/social-icons/apple.png";
import Facebook from "../../../public/social-icons/facebook.png";
import Google from "../../../public/social-icons/google.png";

type Provider = "google" | "facebook" | "apple";
type ProviderAction = "login" | "signup";

const SocialLoginButtons = ({
  provider,
  action,
}: {
  provider: Provider;
  action: ProviderAction;
}) => {
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
      {isGoogle && (
        <span> {action === "signup" ? "Continue" : "Login "} with Google</span>
      )}
      {isFacebook && (
        <span>{action === "signup" ? "Continue" : "Login "} with Facebook</span>
      )}
      {isApple && (
        <span>{action === "signup" ? "Continue" : "Login "} with Apple</span>
      )}
    </button>
  );
};

export default SocialLoginButtons;
