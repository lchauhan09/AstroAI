import { useEffect } from "react";
import { Link, Stack, usePathname, useGlobalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../src/theme/colors";

export default function NotFoundScreen() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();

  useEffect(() => {
    console.log(`[ROUTER] Unmatched Route detected!`);
    console.log(`[ROUTER] Pathname: ${pathname}`);
    console.log(`[ROUTER] Params: ${JSON.stringify(params)}`);
  }, [pathname, params]);

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Unmatched Route</Text>
        <Text style={styles.text}>The app tried to load: {pathname}</Text>
        
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.gold,
  },
  text: {
    fontSize: 16,
    color: colors.muted,
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
