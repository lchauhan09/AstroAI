import { TouchableOpacity, Text } from "react-native";
import { colors } from "../theme/colors";

export default function Button({ title, onPress }: { title: string, onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.gold,
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "black", fontWeight: "600" }}>{title}</Text>
    </TouchableOpacity>
  );
}
