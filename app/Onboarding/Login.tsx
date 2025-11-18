import SocialLoginButtons from "../components/Buttons/SocialLoginButtons";
import EmailField from "../components/Inputs/EmailField";
import PasswordField from "../components/Inputs/PasswordField";

const LoginModal = () => {
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

      <EmailField placeholder="Enter your email address or username" />

      <PasswordField placeholder="Enter your password" />

      <div className="flex justify-center w-full my-5">
        <span className="text-center mx-3 text-sm tracking-wider font-normal text-gray-500">
          By clicking Log in, you accept Quizzy&apos;s Terms of Service and
          Privacy Policy
        </span>
      </div>
      <button className="btn-primary w-full p-5 my-2">Login</button>
      <button className="btn-primary w-full p-5 bg-gray-100 my-2 text-gray-600 text-md font-semibold">
        New to Quizzy? Create and account
      </button>
      <button className="btn-text w-full p-5 pb-10">
        Login with magic link
      </button>
    </div>
  );
};

export default LoginModal;
