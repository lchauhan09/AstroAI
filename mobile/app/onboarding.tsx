import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import { api } from "../src/api/client";
import { colors } from "../src/theme/colors";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1 — Birth Details
  const [birthDate, setBirthDate] = useState(new Date(2000, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthTime, setBirthTime] = useState(new Date(2000, 0, 1, 12, 0));
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [locationMode, setLocationMode] = useState<"city" | "coords">("city");
  const [birthCity, setBirthCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

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
    // Determine location string based on mode
    let locationStr = locationMode === "city" 
      ? birthCity 
      : `${latitude}, ${longitude}`;

    // Format date and time
    const dateStr = birthDate.toISOString().split("T")[0]; // YYYY-MM-DD
    const timeStr = birthTime.toTimeString().split(" ")[0].slice(0, 5); // HH:MM

    try {
      await api("/user/onboarding", {
        method: "POST",
        body: JSON.stringify({ step: "completed" }),
      });

      await api("/user/preferences", {
        method: "POST",
        body: JSON.stringify({
          birth_details: {
            date: dateStr,
            time: timeStr,
            location: locationStr,
          },
          goals,
          notifications,
        }),
      });

      router.replace("/dashboard");
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
          <Text style={styles.subtitle}>Enter your birth details securely.</Text>

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
              onValueChange={(event, selectedDate) => {
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
              onValueChange={(event, selectedDate) => {
                setShowTimePicker(false);
                if (selectedDate) setBirthTime(selectedDate);
              }}
            />
          )}

          <Text style={[styles.label, { marginTop: 20 }]}>Place of Birth</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity 
              style={[styles.toggleBtn, locationMode === "city" && styles.toggleBtnActive]}
              onPress={() => setLocationMode("city")}
            >
              <Text style={styles.toggleTxt}>City / State</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggleBtn, locationMode === "coords" && styles.toggleBtnActive]}
              onPress={() => setLocationMode("coords")}
            >
              <Text style={styles.toggleTxt}>Coordinates</Text>
            </TouchableOpacity>
          </View>

          {locationMode === "city" ? (
            <Input placeholder="e.g. New York, USA" value={birthCity} onChangeText={setBirthCity} />
          ) : (
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Input placeholder="Latitude" value={latitude} onChangeText={setLatitude} keyboardType="numeric" />
              </View>
              <View style={{ flex: 1 }}>
                <Input placeholder="Longitude" value={longitude} onChangeText={setLongitude} keyboardType="numeric" />
              </View>
            </View>
          )}

          <View style={styles.navRow}>
            <Button title="Continue" onPress={() => setStep(2)} />
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

          <View style={styles.navRow}>
            <Button title="Continue to Preferences" onPress={() => setStep(3)} />
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

          <View style={styles.navRow}>
            <Button title="Enter AstroAI" onPress={finishOnboarding} />
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
  }
});
