import { Redirect } from "expo-router";
import { useAuth } from "../src/auth/useAuth";
import { View, ActivityIndicator } from "react-native";
import { colors } from "../src/theme/colors";

export default function Index() {
  const { user } = useAuth();
  
  // Simple loading state check
  // In real app, you might want a more robust splash screen
  
  return <Redirect href={user ? "/dashboard" : "/login"} />;
}
