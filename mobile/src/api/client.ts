import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.2.21:8000";

export async function api(path: string, options: any = {}) {
  const token = await SecureStore.getItemAsync("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = `${API_URL}${path}`;
  console.log(`[API] Fetching: ${url}`);

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });
    
    console.log(`[API] Status: ${res.status} for ${path}`);
    return res.json();
  } catch (error) {
    console.error(`[API] Connection Error for ${url}:`, error);
    throw error;
  }
}
