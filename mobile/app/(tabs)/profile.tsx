import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../src/auth/useAuth";
import { colors } from "../../src/theme/colors";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Cosmic Profile</Text>
        
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user?.name || "Unknown Traveler"}</Text>
          
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutTxt}>Close Cosmic Connection</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingTop: 40,
    flex: 1,
  },
  title: {
    color: colors.gold,
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1A1F2E',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  label: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    color: colors.text,
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'red',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutTxt: {
    color: '#ff4c4c',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
