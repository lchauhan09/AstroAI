export interface Preferences {
  birth_details?: {
    date: string;
    time: string;
    location: string;
  };
  goals?: string[];
  notifications?: boolean;
  push_token?: string;
}
