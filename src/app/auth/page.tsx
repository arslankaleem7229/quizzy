import { Onboarding } from "@/features/auth";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ mode: "login" | "signup" }>;
}) {
  const mode = (await searchParams).mode;
  return <Onboarding type={mode} />;
}
