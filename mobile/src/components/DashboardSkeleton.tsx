import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn } from "react-native-reanimated";

export function DashboardSkeleton() {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((i) => (
        <Animated.View
          key={i}
          entering={FadeIn.duration(400)}
          style={styles.skeletonCard}
        >
          <LinearGradient
            colors={["#2a2a2a", "#3a3a3a", "#2a2a2a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.shimmer}
          />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  skeletonCard: {
    height: 140,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  shimmer: {
    flex: 1,
    opacity: 0.7,
  },
});
