import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

// NOTE: To upgrade to a premium Lottie animation:
// 1. Drop a Lottie JSON file (e.g., 'astrolabe.json') into your assets folder.
// 2. Import LottieView from 'lottie-react-native'.
// 3. Replace the ActivityIndicator below with:
//    <LottieView source={require('../../assets/astrolabe.json')} autoPlay loop style={{ width: 100, height: 100 }} />

export default function CosmicLoader({ message = "Aligning frequencies..." }: { message?: string }) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.gold} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.gold,
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
  },
});
