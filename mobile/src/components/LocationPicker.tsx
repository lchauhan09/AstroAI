import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AutocompleteDropdown, AutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Lazy-load MapLibre to prevent crashes in Expo Go / old dev client builds
let MapLibreGL: any = null;
try {
  MapLibreGL = require("@maplibre/maplibre-react-native");
} catch (_) {
  // Native module not available in this runtime
}

// Extend the base AutocompleteDropdownItem with our location fields
interface LocationItem extends AutocompleteDropdownItem {
  lat?: string;
  lon?: string;
}

const CACHE: Record<string, any[]> = {};

export function LocationPicker({ onSelect }: { onSelect: (loc: any) => void }) {
  const [items, setItems] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadRecent();
  }, []);

  const saveRecent = async (item: any) => {
    const existing = JSON.parse((await AsyncStorage.getItem("recent_locations")) || "[]");
    const updated = [item, ...existing.filter((x: any) => x.id !== item.id)].slice(0, 5);
    await AsyncStorage.setItem("recent_locations", JSON.stringify(updated));
  };

  const loadRecent = async () => {
    const data = JSON.parse((await AsyncStorage.getItem("recent_locations")) || "[]");
    setItems(data);
  };

  const runSearch = async (text: string) => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      setItems([{ id: "offline", title: "Offline — no internet" }]);
      return;
    }

    if (CACHE[text]) {
      setItems(CACHE[text]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`http://192.168.2.21:8000/api/location/search?q=${text}`);

      const mapped = res.data.map((item: any) => ({
        id: item.place_id.toString(),
        title: item.display_name,
        lat: item.lat,
        lon: item.lon,
      }));

      CACHE[text] = mapped;
      setItems(mapped);
    } catch (e) {
      console.error("Location search error", e);
    } finally {
      setLoading(false);
    }
  };

  const search = (text: string) => {
    if (text.length < 2) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      runSearch(text);
    }, 150);
  };

  return (
    <View style={styles.container}>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        onChangeText={search}
        loading={loading}
        onSelectItem={(item) => {
          if (item && item.id !== "offline") {
            saveRecent(item);
            onSelect(item);
          }
        }}
        dataSet={items}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={(item, _text) => {
          const loc = item as LocationItem;
          return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{loc.title}</Text>
            {/* Only render map preview if MapLibre native module is available */}
            {MapLibreGL && loc.lat && loc.lon && (
              <MapLibreGL.MapView
                style={styles.mapPreview}
                zoomLevel={10}
                pitchEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
                logoEnabled={false}
                attributionEnabled={false}
                styleURL="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
                surfaceView={true}
              >
                <MapLibreGL.Camera
                  centerCoordinate={[parseFloat(loc.lon!), parseFloat(loc.lat!)]}
                  zoomLevel={10}
                  animationMode="flyTo"
                  animationDuration={0}
                />
                <MapLibreGL.PointAnnotation
                  id={`preview-${loc.id}`}
                  coordinate={[parseFloat(loc.lon!), parseFloat(loc.lat!)]}
                />
              </MapLibreGL.MapView>
            )}
          </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    zIndex: 100,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: "#1A1F2E",
  },
  itemText: {
    color: "#FFF",
    marginBottom: 10,
    fontSize: 14,
  },
  mapPreview: {
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
  },
  separator: {
    height: 1,
    backgroundColor: "#2A2F3E",
  },
});
