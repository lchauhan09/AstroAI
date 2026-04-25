import { Text, StyleSheet, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

type Props = {
  text: string;
};

export function InsightText({ text }: Props) {
  // Highlight keywords
  const highlighted = text
    .replace(/\b(energy|focus|growth|intuition|alignment|path|clarity|cosmic|harmony)\b/gi, (m) => `§${m}§`)
    .split("§");

  return (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.container}>
      <Text style={styles.paragraph}>
        {highlighted.map((chunk, i) =>
          i % 2 === 1 ? (
            <Text key={i} style={styles.highlight}>
              {chunk}
            </Text>
          ) : (
            <Text key={i} style={styles.text}>
              {chunk}
            </Text>
          )
        )}
      </Text>

      <View style={styles.footer}>
        <View style={styles.divider} />
        <Text style={styles.signature}>Interpreted by AstroAI</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  paragraph: {
    lineHeight: 26,
  },
  text: {
    fontSize: 16,
    color: "#EDEAF5",
    // Note: 'serif' may fallback to default on some systems unless linked
    fontFamily: "serif", 
  },
  highlight: {
    fontSize: 16,
    color: "#F5D27A",
    fontWeight: "700",
    textShadowColor: "rgba(245,210,122,0.4)",
    textShadowRadius: 8,
  },
  footer: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: 8,
    width: "40%",
  },
  signature: {
    fontSize: 12,
    color: "#C8C0D8",
    fontStyle: "italic",
    letterSpacing: 0.5,
  },
});
