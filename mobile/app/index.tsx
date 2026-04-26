import { Redirect } from "expo-router";
import { useAuth } from "../src/auth/useAuth";
import { View, ActivityIndicator } from "react-native";
import { colors } from "../src/theme/colors";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  // If user is not logged in, go to login
  if (!user) return <Redirect href="/login" />;

  // If user is logged in but hasn't finished onboarding, go to onboarding
  if (user.onboarding_step !== "completed") {
    return <Redirect href="/onboarding" />;
  }

  // Otherwise, go to dashboard
  return <Redirect href="/(tabs)/dashboard" />;
}
