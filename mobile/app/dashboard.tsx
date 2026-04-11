import { View, Text, SafeAreaView } from "react-native";
import { useAuth } from "../src/auth/useAuth";
import { colors } from "../src/theme/colors";
import Button from "../src/components/Button";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 24 }}>
        <Text style={{ color: colors.gold, fontSize: 28, fontWeight: 'bold' }}>
          Welcome, {user?.name || 'Seeker'}
        </Text>
        <Text style={{ color: colors.muted, marginTop: 8, marginBottom: 32 }}>
          Your cosmic insights are ready.
        </Text>

        <View style={{ height: 200, backgroundColor: '#1A1F2E', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: colors.muted }}>
            <Text style={{ color: colors.muted }}>Charts & Insights coming soon</Text>
        </View>

        <View style={{ marginTop: 24 }}>
            <Button title="Logout" onPress={logout} />
        </View>
      </View>
    </SafeAreaView>
  );
}
