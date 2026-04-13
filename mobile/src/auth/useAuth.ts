import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";
import { User } from "@astroai/shared";
import { api } from "../api/client";
import { googleConfig } from "./googleConfig";

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

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: googleConfig.clientId,
      scopes: googleConfig.scopes,
      redirectUri: googleConfig.redirectUri,
    },
    { authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth" }
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      (async () => {
        try {
          const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          const profile = await profileRes.json();

          const backendData = await api("/auth/register/google", {
            method: "POST",
            body: JSON.stringify({
              email: profile.email,
              name: profile.name,
              avatar_url: profile.picture,
            }),
          });

          if (backendData.access_token) {
            await SecureStore.setItemAsync("token", backendData.access_token);
            await loadUser();
          }
        } catch (e) {
          console.error("Google login failed", e);
        }
      })();
    }
  }, [response]);

  async function loginWithGoogle() {
    promptAsync();
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

  return { user, login, logout, loadUser, loginWithGoogle };
}
