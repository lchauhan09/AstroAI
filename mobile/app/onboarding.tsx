import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import { LocationPicker } from "../src/components/LocationPicker";
import { api } from "../src/api/client";
import { colors } from "../src/theme/colors";

import { useAuth } from "../src/auth/useAuth";

export default function Onboarding() {
  const { loadUser } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");

  // Step 1 — Birth Details
  const [birthDate, setBirthDate] = useState(new Date(2000, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthTime, setBirthTime] = useState(new Date(2000, 0, 1, 12, 0));
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [birthLocation, setBirthLocation] = useState<{name: string, lat: number, lon: number} | null>(null);
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.pickedLat && params.pickedLon) {
      setBirthLocation({
        name: params.pickedName as string || "Selected from Map",
        lat: parseFloat(params.pickedLat as string),
        lon: parseFloat(params.pickedLon as string),
      });
    }
  }, [params.pickedLat, params.pickedLon]);
  // Step 2 — Goals
  const [goals, setGoals] = useState<string[]>([]);
  // Step 3 — Preferences
  const [notifications, setNotifications] = useState(true);

  function toggleGoal(goal: string) {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  }

  async function finishOnboarding() {
    const dateStr = birthDate.toISOString().split("T")[0];
    const timeStr = birthTime.toTimeString().split(" ")[0].slice(0, 5);
    const locationStr = birthLocation ? birthLocation.name : "Unknown";

    try {
      await api("/user/onboarding", {
        method: "POST",
        body: JSON.stringify({ 
          step: "completed",
          name,
          birth_date: dateStr,
          birth_time: timeStr,
          location: locationStr,
          latitude: birthLocation ? birthLocation.lat : null,
          longitude: birthLocation ? birthLocation.lon : null,
          preferences: {
            goals,
            notifications
          }
        }),
      });

      await loadUser();
      router.replace("/(tabs)/dashboard");
    } catch (e: any) {
      console.error("[ONBOARDING] Error:", e);
      Alert.alert("Process Failed", e.message || "Could not save your preferences. Please try again.");
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Welcome</Text>

      {/* STEP 1 */}
      {step === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.subtitle}>Enter your details securely.</Text>

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>Full Name</Text>
            <Input placeholder="e.g. John Doe" value={name} onChangeText={setName} />
          </View>

          <View style={styles.pickerRow}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity style={styles.pickerButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.pickerButtonText}>{birthDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={(_event: any, selectedDate?: Date) => {
                setShowDatePicker(false);
                if (selectedDate) setBirthDate(selectedDate);
              }}
            />
          )}

          <View style={styles.pickerRow}>
            <Text style={styles.label}>Time of Birth</Text>
            <TouchableOpacity style={styles.pickerButton} onPress={() => setShowTimePicker(true)}>
              <Text style={styles.pickerButtonText}>
                {birthTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
          </View>
          {showTimePicker && (
            <DateTimePicker
              value={birthTime}
              mode="time"
              display="default"
              onChange={(_event: any, selectedDate?: Date) => {
                setShowTimePicker(false);
                if (selectedDate) setBirthTime(selectedDate);
              }}
            />
          )}

          <Text style={[styles.label, { marginTop: 20 }]}>Place of Birth</Text>
          <LocationPicker
            onSelect={(loc) => {
              setBirthLocation({
                name: loc.title,
                lat: parseFloat(loc.lat),
                lon: parseFloat(loc.lon),
              });
            }}
          />
          
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <TouchableOpacity onPress={() => router.push("/location-map")}>
              <Text style={{ color: colors.gold, fontWeight: "600" }}>Or Pick on Map 🗺️</Text>
            </TouchableOpacity>
          </View>
          
          {birthLocation && (
            <Text style={{ color: "white", marginTop: 10, fontSize: 12 }}>
              Selected: {birthLocation.name}
            </Text>
          )}

          <View style={styles.navRow}>
            <Button 
              title="Continue" 
              onPress={() => {
                if (!name.trim()) {
                  Alert.alert("Missing Information", "Please enter your full name.");
                  return;
                }
                if (!birthLocation) {
                  Alert.alert("Missing Information", "Please search and select your place of birth.");
                  return;
                }
                setStep(2);
              }} 
            />
          </View>
        </View>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.subtitle}>What are your cosmic goals?</Text>

          {["Love", "Career", "Health", "Spirituality"].map((goal) => (
            <TouchableOpacity
              key={goal}
              onPress={() => toggleGoal(goal)}
              style={[styles.goalCard, goals.includes(goal) && styles.goalCardActive]}
            >
              <Text style={[styles.goalText, goals.includes(goal) && styles.goalTextActive]}>
                {goal}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.navRowSplit}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Button title="Back" type="outline" onPress={() => setStep(1)} />
            </View>
            <View style={{ flex: 2 }}>
              <Button title="Next" onPress={() => setStep(3)} />
            </View>
          </View>
        </View>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <View style={styles.stepContainer}>
          <Text style={styles.subtitle}>Celestial Preferences</Text>

          <TouchableOpacity
            onPress={() => setNotifications(!notifications)}
            style={[styles.goalCard, notifications && styles.goalCardActive]}
          >
            <Text style={[styles.goalText, notifications && styles.goalTextActive]}>
              {notifications ? "Push Notifications: Active" : "Push Notifications: Muted"}
            </Text>
          </TouchableOpacity>

          <View style={styles.navRowSplit}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Button title="Back" type="outline" onPress={() => setStep(2)} />
            </View>
            <View style={{ flex: 2 }}>
              <Button title="Enter AstroAI" onPress={finishOnboarding} />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingTop: 80,
  },
  title: {
    color: colors.gold,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    marginBottom: 24,
  },
  stepContainer: {
    marginTop: 10,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1A1F2E',
    padding: 16,
    borderRadius: 12,
  },
  pickerButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  pickerButtonText: {
    color: colors.gold,
    fontWeight: 'bold',
  },
  toggleRow: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#1A1F2E',
    borderRadius: 10,
    overflow: 'hidden',
  },
  toggleBtn: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  toggleTxt: {
    color: colors.text,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalCard: {
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#1A1F2E",
    borderWidth: 1,
    borderColor: 'transparent',
  },
  goalCardActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderColor: colors.gold,
  },
  goalText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  goalTextActive: {
    color: colors.gold,
    fontWeight: 'bold',
  },
  navRow: {
    marginTop: 32,
  },
  navRowSplit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
  },
  backBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 16,
  },
  backBtnTxt: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: '600',
  }
});
