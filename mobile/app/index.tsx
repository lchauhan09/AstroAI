import { Redirect } from "expo-router";
import { useAuth } from "../src/auth/useAuth";

export default function Index() {
  const { user } = useAuth();

  // If user is not logged in, go to login
  if (!user) return <Redirect href="/login" />;

  // If user is logged in but hasn't finished onboarding, go to onboarding
  if (user.onboarding_step !== "completed") {
    return <Redirect href="/onboarding" />;
  }

  // Otherwise, go to dashboard
  return <Redirect href="/dashboard" />;
}
