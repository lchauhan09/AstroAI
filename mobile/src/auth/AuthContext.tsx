import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { registerForPush } from "../services/notifications";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";
import { User } from "@astroai/shared"; // Assuming this is available or we'll bypass type for now
import { api } from "../api/client";
import { googleConfig } from "./googleConfig";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      registerForPush();
    }
  }, [user]);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: googleConfig.clientId,
      scopes: googleConfig.scopes,
      redirectUri: googleConfig.redirectUri,
    },
    { authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth" }
  );

  async function loadUser() {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await api("/user/me");
      if (data && !data.detail) {
        setUser(data);
      } else {
        await logout();
      }
    } catch (e) {
      console.error("[AUTH] Failed to load user", e);
      await logout();
    } finally {
      setLoading(false);
    }
  }

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

  async function register(name: string, email: string, password: string) {
    await api("/auth/register/email", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    // After registration, log the user in
    await login(email, password);
  }

  async function loginWithGoogle() {
    promptAsync();
  }

  async function logout() {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  }

  // Handle Google OAuth Response
  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      console.log("[AUTH] Google Auth Success. Redirecting to background processing...");
      
      (async () => {
        try {
          const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          const profile = await profileRes.json();
          console.log(`[AUTH] Google Profile retrieved: ${profile.email}`);
          
          console.log(`[AUTH] Sending registration to backend...`);
          const backendData = await api("/auth/register/google", {
            method: "POST",
            body: JSON.stringify({
              email: profile.email,
              name: profile.name,
              avatar_url: profile.picture,
            }),
          });

          if (backendData.access_token) {
            console.log("[AUTH] Registration successful, saving token...");
            await SecureStore.setItemAsync("token", backendData.access_token);
            await loadUser();
          } else {
            console.error("[AUTH] Backend registration failed (no token):", backendData);
          }
        } catch (e: any) {
          console.error("[AUTH] Error in Google Auth lifecycle", e);
          Alert.alert("Authentication Error", e.message || "Failed to complete Google sign-in.");
        }
      })();
    }
  }, [response]);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
