import { View, Text } from "react-native";
import { colors } from "../src/theme/colors";

export default function Onboarding() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colors.gold, fontSize: 28 }}>
        Complete your onboarding
      </Text>
      <Text style={{ color: colors.text, marginTop: 12 }}>
        Personalizing your cosmic experience...
      </Text>
    </View>
  );
}
