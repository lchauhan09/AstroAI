import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "../api/client";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  onboarding_step: string;
  preferences: any;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    const data = await api("/auth/login", {
      method: "POST",
      body: new URLSearchParams({ username: email, password }).toString(),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (data.access_token) {
        await SecureStore.setItemAsync("token", data.access_token);
        await loadUser();
    }
  }

  async function loadUser() {
    try {
        const data = await api("/user/me");
        if (data && !data.detail) {
            setUser(data);
        }
    } catch (e) {
        console.error("Failed to load user", e);
    }
  }

  async function logout() {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return { user, login, logout, loadUser };
}
