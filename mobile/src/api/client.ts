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
        let errorMessage = `API Error: ${res.status}`;
        const errorText = await res.text().catch(() => "");
        
        try {
            const errorData = JSON.parse(errorText);
            if (errorData && errorData.detail) {
                errorMessage = errorData.detail;
            }
        } catch (e) {
            console.error(`[API] Raw error body for ${path}:`, errorText);
        }
        
        console.error(`[API] Error for ${path}:`, errorMessage);
        throw new Error(errorMessage);
    }

    return res.json();
  } catch (error) {
    console.error(`[API] Connection Error for ${url}:`, error);
    throw error;
  }
}
