import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import { api } from "../src/api/client";
import { colors } from "../src/theme/colors";

export default function Onboarding() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  // Step 1 — Birth Details
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthLocation, setBirthLocation] = useState("");

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
    // 1. Save onboarding step
    await api("/user/onboarding", {
      method: "POST",
      body: JSON.stringify({ step: "completed" }),
    });

    // 2. Save preferences
    await api("/user/preferences", {
      method: "POST",
      body: JSON.stringify({
        birth_details: {
          date: birthDate,
          time: birthTime,
          location: birthLocation,
        },
        goals,
        notifications,
      }),
    });

    router.replace("/dashboard");
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 24 }}>
      <Text style={{ color: colors.gold, fontSize: 28, marginBottom: 20, paddingTop: 60 }}>
        Onboarding
      </Text>

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <Text style={{ color: colors.text, marginBottom: 12 }}>
            Enter your birth details
          </Text>

          <Input placeholder="Birth Date (YYYY-MM-DD)" value={birthDate} onChangeText={setBirthDate} />
          <Input placeholder="Birth Time (HH:MM)" value={birthTime} onChangeText={setBirthTime} />
          <Input placeholder="Birth Location" value={birthLocation} onChangeText={setBirthLocation} />

          <View style={{ marginTop: 20 }}>
            <Button title="Next" onPress={() => setStep(2)} />
          </View>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <Text style={{ color: colors.text, marginBottom: 12 }}>
            What are your goals?
          </Text>

          {["Love", "Career", "Health", "Spirituality"].map((goal) => (
            <TouchableOpacity
              key={goal}
              onPress={() => toggleGoal(goal)}
              style={{
                padding: 14,
                borderRadius: 10,
                marginBottom: 10,
                backgroundColor: goals.includes(goal) ? colors.gold : "#1A1F2E",
              }}
            >
              <Text style={{ color: goals.includes(goal) ? "black" : colors.text }}>
                {goal}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={{ marginTop: 20 }}>
            <Button title="Next" onPress={() => setStep(3)} />
          </View>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <Text style={{ color: colors.text, marginBottom: 12 }}>
            Preferences
          </Text>

          <TouchableOpacity
            onPress={() => setNotifications(!notifications)}
            style={{
              padding: 14,
              borderRadius: 10,
              marginBottom: 20,
              backgroundColor: notifications ? colors.gold : "#1A1F2E",
            }}
          >
            <Text style={{ color: notifications ? "black" : colors.text }}>
              {notifications ? "Notifications: ON" : "Notifications: OFF"}
            </Text>
          </TouchableOpacity>

          <Button title="Finish" onPress={finishOnboarding} />
        </>
      )}
    </View>
  );
}
