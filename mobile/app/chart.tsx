import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/auth/useAuth';
import { api } from '../src/api/client';

interface PlanetPosition {
  degree: number;
  sign: string;
  sign_degree: number;
}

interface HouseData {
  house: number;
  degree: number;
  sign: string;
  sign_degree: number;
}

interface NatalData {
  planets: Record<string, PlanetPosition>;
  ascendant: PlanetPosition;
  houses: HouseData[];
}

export default function ChartScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<NatalData | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchNatalData();
  }, []);

  const fetchNatalData = async () => {
    try {
      const json = await api("/astro/my-natal");
      setData(json);
    } catch (error) {
      console.error("Error fetching natal data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Calculating Cosmic Positions...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#0F0C29', '#302B63', '#24243E']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Your Natal Chart</Text>
          <View style={{ width: 40 }} />
        </View>

        {data && (
          <>
            <BlurView intensity={30} style={styles.ascendantCard}>
              <Text style={styles.cardLabel}>Ascendant (Rising Sign)</Text>
              <Text style={styles.ascendantValue}>{data.ascendant.sign}</Text>
              <Text style={styles.degreeText}>{data.ascendant.degree.toFixed(2)}°</Text>
            </BlurView>

            <Text style={styles.sectionTitle}>Planetary Positions</Text>
            
            {Object.entries(data.planets).map(([name, pos]: [string, PlanetPosition]) => (
              <BlurView key={name} intensity={20} style={styles.planetCard}>
                <View style={styles.planetInfo}>
                  <Text style={styles.planetName}>{name}</Text>
                  <Text style={styles.planetSign}>{pos.sign}</Text>
                </View>
                <View style={styles.degreeInfo}>
                  <Text style={styles.degreeValue}>{pos.sign_degree.toFixed(2)}°</Text>
                </View>
              </BlurView>
            ))}
            
            <Text style={styles.sectionTitle}>House Degrees</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data.houses.map((house: HouseData) => (
                <BlurView key={house.house} intensity={20} style={styles.houseCard}>
                  <Text style={styles.houseNum}>House {house.house}</Text>
                  <Text style={styles.houseSign}>{house.sign}</Text>
                  <Text style={styles.houseDegree}>{house.sign_degree.toFixed(1)}°</Text>
                </BlurView>
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0F0C29',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFD700',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
  },
  ascendantCard: {
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  cardLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ascendantValue: {
    color: '#FFD700',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 10,
    fontFamily: 'Outfit-Bold',
  },
  degreeText: {
    color: '#FFF',
    fontSize: 18,
    opacity: 0.8,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 10,
    fontFamily: 'Outfit-SemiBold',
  },
  planetCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    overflow: 'hidden',
  },
  planetInfo: {
    flex: 1,
  },
  planetName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  planetSign: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  degreeInfo: {
    alignItems: 'flex-end',
  },
  degreeValue: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  houseCard: {
    padding: 15,
    borderRadius: 15,
    marginRight: 10,
    width: 120,
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  houseNum: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  houseSign: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  houseDegree: {
    color: '#FFD700',
    fontSize: 14,
  }
});
