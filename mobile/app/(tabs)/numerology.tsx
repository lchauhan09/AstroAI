import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useDailyNumerology } from "../../src/api/queries";
import { colors } from "../../src/theme/colors";
import CosmicLoader from "../../src/components/CosmicLoader";

interface NumerologyData {
  daily?: {
    message: string;
    personal_day: number;
    personal_month: number;
  };
  core_numbers?: {
    life_path_number: number;
    destiny_number: number;
    soul_urge: number;
  };
}

export default function Numerology() {
  const { data: queryData, isLoading, isError } = useDailyNumerology();
  const data = queryData as NumerologyData | undefined;

  if (isLoading) {
    return <CosmicLoader message="Aligning frequencies..." />;
  }

  if (isError || !data) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: "red" }}>Error computing numerology metrics.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your Numerology</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Message</Text>
          <Text style={styles.text}>{data.daily?.message}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.halfCard}>
            <Text style={styles.minTitle}>Personal Day</Text>
            <Text style={styles.bigNumber}>{data.daily?.personal_day}</Text>
          </View>
          
          <View style={styles.halfCard}>
            <Text style={styles.minTitle}>Personal Month</Text>
            <Text style={styles.bigNumber}>{data.daily?.personal_month}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Core Vibrations</Text>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Life Path Number</Text>
            <Text style={styles.metricValue}>{data.core_numbers?.life_path_number}</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Destiny Number</Text>
            <Text style={styles.metricValue}>{data.core_numbers?.destiny_number}</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Soul Urge</Text>
            <Text style={styles.metricValue}>{data.core_numbers?.soul_urge}</Text>
          </View>
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
    alignItems: 'center',
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
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2F3E',
    paddingBottom: 8,
  },
  metricLabel: {
    color: colors.text,
    fontWeight: '500',
    fontSize: 16,
  },
  metricValue: {
    color: colors.gold,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
