import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import { useAuth } from "../src/auth/useAuth";
import { colors } from "../src/theme/colors";
import { Redirect, useRouter } from "expo-router";

export default function Login() {
  const { user, login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  if (user) {
    return <Redirect href="/" />;
  }

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (e: any) {
      console.error("[LOGIN] Error:", e);
      Alert.alert("Login Failed", e.message || "Something went wrong.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (e: any) {
      console.error("[GOOGLE LOGIN] Error:", e);
      Alert.alert("Google Login Failed", e.message || "Something went wrong.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: colors.gold, fontSize: 42, marginBottom: 8, fontWeight: 'bold' }}>
        AstroAI
      </Text>
      <Text style={{ color: colors.muted, fontSize: 16, marginBottom: 32 }}>
        Ancient Wisdom. Modern Clarity.
      </Text>

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

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity 
        style={{ marginTop: 24, alignItems: 'center' }}
        onPress={() => router.push("/register")}
      >
        <Text style={{ color: colors.muted }}>
          Don't have an account? <Text style={{ color: colors.gold, fontWeight: 'bold' }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 32 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#2A2F3E' }} />
        <Text style={{ color: colors.muted, marginHorizontal: 16 }}>or</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: '#2A2F3E' }} />
      </View>

      <Button 
        title="Continue with Google" 
        onPress={handleGoogleLogin} 
        type="outline"
      />
    </View>
  );
}

