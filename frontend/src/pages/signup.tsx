import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Signup() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    window.location.href = "/app/onboarding";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--color-luxury-bg)" }}
    >
      <div className="w-full max-w-md bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-[var(--color-cosmic-gold)] shadow-xl">
        <h1
          className="text-3xl mb-6 text-center"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-cosmic-gold)",
          }}
        >
          Create Your AstroAI Account
        </h1>

        {/* Google Sign-In */}
        <button
          onClick={() => signIn("google")}
          className="w-full py-3 mb-6 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Continue with Google
        </button>

        <div className="text-center text-gray-400 mb-4">or</div>

        {/* Manual Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white"
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-black"
            style={{
              backgroundColor: "var(--color-cosmic-gold)",
            }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
