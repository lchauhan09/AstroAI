import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";

interface DashboardCardProps {
  title: string;
  subtitle: string;
  gradient: readonly [string, string, ...string[]];
  data: { label: string; value: string | number }[];
  Icon?: React.ComponentType<{ size?: number; color?: string }>;
  children?: React.ReactNode;
}

export function DashboardCard({ title, subtitle, gradient, data, Icon, children }: DashboardCardProps) {
  return (
    <Animated.View entering={FadeInUp.duration(500)} style={styles.cardWrapper}>
      <LinearGradient colors={gradient as any} style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          {Icon && (
            <View style={styles.iconWrapper}>
              <Icon size={24} color="#fff" />
            </View>
          )}
        </View>

        {data.map((item, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}

        {children}
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: { marginBottom: 20 },
  card: {
    padding: 20,
    borderRadius: 16,
    elevation: 6,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    flex: 1,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.15)",
    marginLeft: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#f0e6ff",
  },
  row: {
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: "#f7f7f7",
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
