import { Preferences } from "./Preferences";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  onboarding_step: string;
  preferences: Preferences;
}
