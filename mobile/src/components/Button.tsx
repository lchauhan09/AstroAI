import { TouchableOpacity, Text } from "react-native";
import { colors } from "../theme/colors";

export default function Button({ title, onPress, type = "solid" }: { title: string, onPress: () => void, type?: "solid" | "outline" }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: type === "outline" ? "transparent" : colors.gold,
        borderWidth: type === "outline" ? 1 : 0,
        borderColor: type === "outline" ? colors.gold : "transparent",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <Text style={{ color: type === "outline" ? colors.gold : "black", fontWeight: "600" }}>{title}</Text>
    </TouchableOpacity>
  );
}
