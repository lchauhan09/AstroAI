import { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { getDashboardData, getWeeklyForecast } from "../../src/services/dashboard";
import { DashboardCard } from "../../src/components/DashboardCard";
import { DashboardSkeleton } from "../../src/components/DashboardSkeleton";
import { useTheme } from "../../src/theme/useTheme";
import { CosmicBackground } from "../../src/components/CosmicBackground";
import { ZodiacIcons, PlanetIcons } from "../../src/components/icons/CosmicIcons";
import { InsightText } from "../../src/components/InsightText";

export default function DashboardScreen() {
  const [data, setData] = useState<any>(null);
  const [weekly, setWeekly] = useState<any>(null);
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      try {
        const [d, w] = await Promise.all([
          getDashboardData(),
          getWeeklyForecast()
        ]);
        setData(d);
        setWeekly(w);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    })();
  }, []);

  if (!data) return <DashboardSkeleton />;

  const { numerology, astrology, ai_insight } = data;

  // Dynamic Icon Mapping
  const sunSign = astrology.planets.Sun?.sign?.toLowerCase();
  const ZodiacIcon = ZodiacIcons[sunSign as keyof typeof ZodiacIcons] || ZodiacIcons.aries;

  return (
    <View style={styles.container}>
      <CosmicBackground />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Animated.Text
          entering={FadeInUp.duration(600)}
          style={[styles.title, { color: theme.colors.textPrimary }]}
        >
          Your Cosmic Dashboard
        </Animated.Text>
        
        <DashboardCard
          title="Numerology"
          subtitle="Your daily numbers"
          gradient={theme.gradients.gold}
          Icon={PlanetIcons.sun}
          data={[
            { label: "Life Path", value: numerology.core.life_path_number },
            { label: "Destiny", value: numerology.core.destiny_number },
            { label: "Daily Insight", value: numerology.daily.message },
          ]}
        />

        <DashboardCard
          title="Astrology"
          subtitle="Your celestial blueprint"
          gradient={theme.gradients.purple}
          Icon={ZodiacIcon}
          data={[
            { label: "Sun", value: astrology.planets.Sun?.sign || "N/A" },
            { label: "Moon", value: astrology.planets.Moon?.sign || "N/A" },
            { label: "Ascendant", value: astrology.ascendant.sign },
          ]}
        />

        <DashboardCard
          title="AI Insight"
          subtitle="Personalized interpretation"
          gradient={theme.gradients.blue}
          Icon={PlanetIcons.moon}
          data={[]}
        >
          <InsightText text={ai_insight.message} />
        </DashboardCard>

        {weekly && (
          <DashboardCard
            title="Your Week Ahead"
            subtitle={weekly.theme}
            gradient={theme.gradients.gold}
            Icon={PlanetIcons.sun}
            data={[]}
          >
            <InsightText text={weekly.summary} />
            <View style={{ marginTop: 12 }}>
              {weekly.days?.map((d: any, idx: number) => (
                <View key={idx} style={styles.dayRow}>
                  <Text style={styles.dayName}>{d.day}</Text>
                  <Text style={styles.dayFocus}>
                    {d.focus} — <Text style={styles.dayNote}>{d.note}</Text>
                  </Text>
                </View>
              ))}
            </View>
          </DashboardCard>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingTop: 60, paddingBottom: 80 },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
  },
  dayRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  dayName: {
    color: "#F5D27A",
    fontWeight: "700",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  dayFocus: {
    color: "#EDEAF5",
    fontSize: 15,
    lineHeight: 20,
  },
  dayNote: {
    color: "#C8C0D8",
    fontSize: 14,
    fontStyle: "italic",
  },
});
