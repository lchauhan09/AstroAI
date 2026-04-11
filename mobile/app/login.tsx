import { useState } from "react";
import { View, Text } from "react-native";
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import { useAuth } from "../src/auth/useAuth";
import { colors } from "../src/theme/colors";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      <Button title="Login" onPress={() => login(email, password)} />
    </View>
  );
}
