import { useState } from "react";
import LuxuryLayout from "@/components/LuxuryLayout";

export default function Onboarding() {
  const [form, setForm] = useState({
    full_name: "",
    birth_date: "",
    birth_time: "",
    birth_place: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    window.location.href = "/app/dashboard";
  };

  return (
    <LuxuryLayout>
      <div className="max-w-xl mx-auto bg-black/30 p-8 rounded-2xl border border-[var(--color-cosmic-gold)] backdrop-blur-xl">
        <h2
          className="text-3xl mb-6 text-center"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-cosmic-gold)" }}
        >
          Welcome to AstroAI
        </h2>

        <p className="text-gray-300 text-center mb-6">
          Let’s personalize your experience with your birth details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white"
            required
          />

          <input
            type="date"
            value={form.birth_date}
            onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white"
            required
          />

          <input
            type="time"
            value={form.birth_time}
            onChange={(e) => setForm({ ...form, birth_time: e.target.value })}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white"
            required
          />

          <input
            type="text"
            placeholder="Birth Place"
            value={form.birth_place}
            onChange={(e) => setForm({ ...form, birth_place: e.target.value })}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white"
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-black hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--color-cosmic-gold)" }}
          >
            Continue
          </button>
        </form>
      </div>
    </LuxuryLayout>
  );
}
