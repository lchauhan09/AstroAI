import { useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../src/theme/colors";

/**
 * This screen handles the landing page for OAuth redirects.
 * It prevents the "Unmatched Route" error by providing a valid 
 * destination for the deep link, while the useAuth hook 
 * processes the response in the background.
 */
export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Small timeout to ensure the AuthSession hook in useAuth.ts 
    // has caught the response before we navigate away.
    const timer = setTimeout(() => {
      router.replace("/");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={colors.gold} />
      <Text style={{ color: colors.muted, marginTop: 16 }}>Authenticating...</Text>
    </View>
  );
}
