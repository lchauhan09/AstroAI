import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";

// MapLibre is a native module — dynamically require it only in a dev client build.
// In Expo Go, this will gracefully show a fallback instead of crashing the router.
let MapLibreGL: any = null;
try {
  MapLibreGL = require("@maplibre/maplibre-react-native");
} catch (_) {
  // Native module not available in this runtime (e.g. Expo Go)
}

export default function LocationMapScreen() {
  const [coord, setCoord] = useState<number[] | null>(null);
  const router = useRouter();

  // Graceful fallback if native MapLibre isn't available
  if (!MapLibreGL) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackTitle}>Map Not Available</Text>
        <Text style={styles.fallbackText}>
          The interactive map requires a development build.{"\n"}
          Please use text search to find your location.
        </Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapLibreGL.MapView
        style={{ flex: 1 }}
        styleURL="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        onPress={(e: any) => {
          setCoord(e.geometry.coordinates);
        }}
      >
        <MapLibreGL.Camera
          zoomLevel={3}
          centerCoordinate={[-98.5795, 39.8283]}
        />
        {coord && (
          <MapLibreGL.PointAnnotation
            id="picked"
            coordinate={coord}
          />
        )}
      </MapLibreGL.MapView>

      {coord && (
        <TouchableOpacity
          style={styles.confirm}
          onPress={() => {
            router.push({
              pathname: "/onboarding",
              params: {
                pickedLat: coord[1],
                pickedLon: coord[0],
                pickedName: `Lat: ${coord[1].toFixed(2)}, Lon: ${coord[0].toFixed(2)}`,
              },
            });
          }}
        >
          <Text style={styles.text}>Use this location</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  confirm: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#D4AF37",
    padding: 16,
    borderRadius: 12,
  },
  text: { color: "black", textAlign: "center", fontSize: 16, fontWeight: "bold" },
  fallback: {
    flex: 1,
    backgroundColor: "#0D0F1A",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  fallbackTitle: {
    color: "#D4AF37",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  fallbackText: {
    color: "#888",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  backBtn: {
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    borderWidth: 1,
    borderColor: "#D4AF37",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  backBtnText: {
    color: "#D4AF37",
    fontSize: 16,
    fontWeight: "600",
  },
});
