export interface DOB {
  day: string;
  month: string;
  year: string;
}

export interface LoginFormData {
  identifier: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  dob: DOB;
}

export interface AuthScreenProps {
  onSuccess: () => void;
  onChange: () => void;
}

export interface SocialProvider {
  provider: "google" | "facebook" | "apple";
}

export interface OnboardingProps {
  type?: "login" | "signup";
}
