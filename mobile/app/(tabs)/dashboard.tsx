import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDailyAstro } from "../../src/api/queries";
import { colors } from "../../src/theme/colors";
import CosmicLoader from "../../src/components/CosmicLoader";

interface DailyAstro {
  horoscope: string;
  moon_phase: string;
  lucky_number: number;
  lucky_color: string;
  transits: { planet: string; status: string }[];
}

export default function Dashboard() {
  const { data: queryData, isLoading, isError } = useDailyAstro();
  const data = queryData as DailyAstro | undefined;

  if (isLoading) {
    return <CosmicLoader message="Loading your stars..." />;
  }

  if (isError || !data) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: "red" }}>Error loading cosmic insights.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your Daily Insights</Text>

        {/* Horoscope */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Horoscope</Text>
          <Text style={styles.text}>{data.horoscope}</Text>
        </View>

        {/* Moon Phase & Planetary Details Row */}
        <View style={styles.row}>
          <View style={styles.halfCard}>
            <Text style={styles.minTitle}>Moon Phase</Text>
            <Text style={styles.text}>{data.moon_phase}</Text>
          </View>
          
          <View style={styles.halfCard}>
            <Text style={styles.minTitle}>Lucky Color</Text>
            <Text style={styles.text}>{data.lucky_color}</Text>
          </View>
        </View>

        {/* Lucky Number */}
        <View style={[styles.card, { alignItems: 'center' }]}>
          <Text style={styles.minTitle}>Lucky Number</Text>
          <Text style={styles.bigNumber}>{data.lucky_number}</Text>
        </View>

        {/* Transits */}
        <View style={[styles.card, { marginBottom: 40 }]}>
          <Text style={styles.cardTitle}>Planetary Transits</Text>

          {data.transits?.map((t: { planet: string; status: string }, i: number) => (
            <View key={i} style={styles.transitRow}>
              <Text style={styles.planetName}>{t.planet}</Text>
              <Text style={styles.planetStatus}>{t.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.text,
    marginTop: 12,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 40,
  },
  title: {
    color: colors.gold,
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 24,
    backgroundColor: '#1A1F2E',
    padding: 16,
    borderRadius: 15,
  },
  cardTitle: {
    color: colors.gold,
    fontSize: 20,
    marginBottom: 8,
    fontWeight: '600',
  },
  text: {
    color: colors.text,
    lineHeight: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  halfCard: {
    flex: 0.48,
    backgroundColor: '#1A1F2E',
    padding: 16,
    borderRadius: 15,
  },
  minTitle: {
    color: colors.gold,
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '600',
  },
  bigNumber: {
    color: colors.text,
    fontSize: 36,
    fontWeight: 'bold',
  },
  transitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2F3E',
    paddingBottom: 8,
  },
  planetName: {
    color: colors.text,
    fontWeight: '500',
  },
  planetStatus: {
    color: colors.muted,
  }
});
