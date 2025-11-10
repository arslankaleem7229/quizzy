import SocialLoginButtons from "../components/Buttons/SocialLoginButtons";
import DOBDropdown from "../components/Inputs/DOBDropdown";
import EmailField from "../components/Inputs/EmailField";
import PasswordField from "../components/Inputs/PasswordField";

const SignupPage = () => {
  return (
    <div>
      <div className="space-x-15">
        <div className="flex flex-col gap-5 w-full">
          <SocialLoginButtons provider="google" action="signup" />
          <SocialLoginButtons provider="facebook" action="signup" />
          <SocialLoginButtons provider="apple" action="signup" />
        </div>
      </div>

      <div className="flex items-center w-full my-8">
        <div className="grow border-t border-gray-100"></div>
        <span className="mx-3 text-xs tracking-wider font-semibold text-gray-500">
          or email
        </span>
        <div className="grow border-t border-gray-100"></div>
      </div>

      <DOBDropdown />

      <EmailField placeholder="Enter your email address" label="Email" />

      <EmailField placeholder="Enter your username" label="Username" />

      <PasswordField placeholder="Enter your password" label="Password" />

      <PasswordField
        placeholder="Enter your password"
        label="Confirm Password"
      />

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
    </div>
  );
};

export default SignupPage;
