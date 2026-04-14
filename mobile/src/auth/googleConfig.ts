import * as AuthSession from "expo-auth-session";
import { Platform } from "react-native";

export const googleConfig = {
  clientId: Platform.select({
    ios: "26035044129-71n0bfbbt6jbh58mvr99uqs2obm3rne4.apps.googleusercontent.com",
    android: "26035044129-n8pg5eclhv82tkg0e3kojs1gmf0494ca.apps.googleusercontent.com",
    default: "26035044129-n8pg5eclhv82tkg0e3kojs1gmf0494ca.apps.googleusercontent.com",
  }),
  redirectUri: Platform.select({
    android: "com.astroai.app:/oauth2redirect/google",
    default: AuthSession.makeRedirectUri({
      scheme: "astroai",
      path: "redirect",
    }),
  }),
  scopes: ["profile", "email"],
};
