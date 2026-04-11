import { TextInput, TextInputProps } from "react-native";
import { colors } from "../theme/colors";

export default function Input(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.muted}
      style={{
        backgroundColor: "#1A1F2E",
        padding: 14,
        borderRadius: 10,
        color: colors.text,
        marginBottom: 12,
      }}
    />
  );
}
