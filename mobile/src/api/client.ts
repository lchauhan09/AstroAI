import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.2.21:8000";

export async function api(path: string, options: any = {}) {
  const token = await SecureStore.getItemAsync("token");
  console.log(`[API] Token present: ${!!token} ${token ? `(${token.substring(0, 10)}...)` : ""}`);

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
    
    if (res.status === 401) {
      await SecureStore.deleteItemAsync("token");
      // Could emit an event here to notify the router to kick the user out,
      // but deleting the token prevents infinite loops on retry.
      throw new Error("Unauthorized");
    }

    if (!res.ok) {
        const errorBody = await res.text();
        console.error(`[API] Error body for ${path}:`, errorBody);
        throw new Error(`API Error: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error(`[API] Connection Error for ${url}:`, error);
    throw error;
  }
}
