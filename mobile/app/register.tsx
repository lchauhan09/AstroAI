import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import { useAuth } from "../src/auth/useAuth";
import { colors } from "../src/theme/colors";
import { Redirect, useRouter } from "expo-router";

export default function Register() {
  const { user, register } = useAuth();
  const router = useRouter();
  
  if (user) {
    return <Redirect href="/" />;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Basic Validation
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
    } catch (e: any) {
      console.error("[REGISTER] Error:", e);
      Alert.alert("Registration Failed", e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: colors.gold, fontSize: 32, marginBottom: 8, fontWeight: 'bold' }}>
        Join AstroAI
      </Text>
      <Text style={{ color: colors.muted, fontSize: 16, marginBottom: 32 }}>
        Begin your cosmic journey today.
      </Text>

      <Input 
        placeholder="Full Name" 
        value={name} 
        onChangeText={setName} 
      />
      <Input 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input 
        placeholder="Password" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />

      <Button title={loading ? "Creating Account..." : "Create Account"} onPress={handleRegister} />

      <TouchableOpacity 
        style={{ marginTop: 24, alignItems: 'center' }}
        onPress={() => router.push("/login")}
      >
        <Text style={{ color: colors.muted }}>
          Already have an account? <Text style={{ color: colors.gold, fontWeight: 'bold' }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
