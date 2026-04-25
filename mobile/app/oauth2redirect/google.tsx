import { useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../../src/theme/colors";

/**
 * Handle specific Android redirect: /oauth2redirect/google
 */
export default function AndroidAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={colors.gold} />
      <Text style={{ color: colors.muted, marginTop: 16 }}>Finalizing Login...</Text>
    </View>
  );
}
