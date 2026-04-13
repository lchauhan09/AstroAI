import { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { api } from "../src/api/client";
import { colors } from "../src/theme/colors";

interface DailyAstro {
  horoscope: string;
  moon_phase: string;
  lucky_number: number;
  lucky_color: string;
  transits: { planet: string; status: string }[];
}

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<DailyAstro | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const res = await api("/astro/daily");
      setData(res);
    } catch (error) {
      console.error("Failed to load astro data", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.gold} />
        <Text style={{ color: colors.text, marginTop: 12 }}>Loading your stars...</Text>
      </View>
    );
  }

  if (!data) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1, padding: 24 }}>
        <Text style={{ color: colors.gold, fontSize: 32, marginBottom: 20, fontWeight: 'bold' }}>
          Your Daily Insights
        </Text>

        <TouchableOpacity 
          onPress={() => router.push("/chart")}
          style={{ marginBottom: 24, backgroundColor: colors.gold, padding: 16, borderRadius: 15, alignItems: 'center' }}
        >
          <Text style={{ color: colors.background, fontSize: 18, fontWeight: 'bold' }}>
            View Full Birth Chart
          </Text>
        </TouchableOpacity>

        {/* Horoscope */}
        <View style={{ marginBottom: 24, backgroundColor: '#1A1F2E', padding: 16, borderRadius: 15 }}>
          <Text style={{ color: colors.gold, fontSize: 20, marginBottom: 8, fontWeight: '600' }}>
            Daily Horoscope
          </Text>
          <Text style={{ color: colors.text, lineHeight: 24 }}>{data.horoscope}</Text>
        </View>

        {/* Moon Phase & Planetary Details Row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
          <View style={{ flex: 0.48, backgroundColor: '#1A1F2E', padding: 16, borderRadius: 15 }}>
            <Text style={{ color: colors.gold, fontSize: 16, marginBottom: 4, fontWeight: '600' }}>
              Moon Phase
            </Text>
            <Text style={{ color: colors.text }}>{data.moon_phase}</Text>
          </View>
          
          <View style={{ flex: 0.48, backgroundColor: '#1A1F2E', padding: 16, borderRadius: 15 }}>
            <Text style={{ color: colors.gold, fontSize: 16, marginBottom: 4, fontWeight: '600' }}>
              Lucky Color
            </Text>
            <Text style={{ color: colors.text }}>{data.lucky_color}</Text>
          </View>
        </View>

        {/* Lucky Number */}
        <View style={{ marginBottom: 24, backgroundColor: '#1A1F2E', padding: 16, borderRadius: 15, alignItems: 'center' }}>
          <Text style={{ color: colors.gold, fontSize: 18, marginBottom: 4, fontWeight: '600' }}>
            Lucky Number
          </Text>
          <Text style={{ color: colors.text, fontSize: 36, fontWeight: 'bold' }}>{data.lucky_number}</Text>
        </View>

        {/* Transits */}
        <View style={{ marginBottom: 40, backgroundColor: '#1A1F2E', padding: 16, borderRadius: 15 }}>
          <Text style={{ color: colors.gold, fontSize: 20, marginBottom: 12, fontWeight: '600' }}>
            Planetary Transits
          </Text>

          {data.transits.map((t: { planet: string; status: string }, i: number) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, borderBottomWidth: 0.5, borderBottomColor: '#2A2F3E', paddingBottom: 8 }}>
              <Text style={{ color: colors.text, fontWeight: '500' }}>{t.planet}</Text>
              <Text style={{ color: colors.muted }}>{t.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
