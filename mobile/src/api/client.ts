import * as SecureStore from "expo-secure-store";

const API_URL = "http://10.0.2.2:8000"; // Default for Android Emulator to localhost

export async function api(path: string, options: any = {}) {
  const token = await SecureStore.getItemAsync("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  return res.json();
}
