import { StyleSheet } from "react-native";
import { Canvas, Circle, Group, LinearGradient, vec } from "@shopify/react-native-skia";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

export function CosmicBackground() {
  const drift = useSharedValue(0);

  useEffect(() => {
    drift.value = withRepeat(
      withTiming(1, { duration: 18000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: drift.value * 10 }],
  }));

  const stars = Array.from({ length: 40 }).map((_, i) => ({
    x: Math.random() * 400,
    y: Math.random() * 800,
    r: Math.random() * 1.2 + 0.3,
    opacity: Math.random() * 0.4 + 0.2,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Canvas style={styles.canvas}>
        {/* Nebula Glow */}
        <Group>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(400, 800)}
            colors={["#1A1A24", "#0A0A0F"]}
          />
        </Group>

        {/* Stars */}
        {stars.map((s, i) => (
          <Circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            color={`rgba(255,255,255,${s.opacity})`}
          />
        ))}
      </Canvas>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  canvas: {
    width: "100%",
    height: "100%",
  },
});
