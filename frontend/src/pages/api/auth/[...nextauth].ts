import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // Forward Google user info to FastAPI backend
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: user.name,
            email: user.email,
            password: "google-oauth", // placeholder
          }),
        });
      } catch (err) {
        console.error("FastAPI registration failed", err);
      }

      return true;
    },

    async redirect() {
      return "/app/onboarding";
    },
  },
});
