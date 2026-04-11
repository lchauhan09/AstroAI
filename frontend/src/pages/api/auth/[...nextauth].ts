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
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            avatar_url: user.image,
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
