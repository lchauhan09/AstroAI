import LuxuryLayout from "@/components/LuxuryLayout";

export default function Dashboard() {
  return (
    <LuxuryLayout>
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-4xl mb-4"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-cosmic-gold)" }}
        >
          Your Cosmic Dashboard
        </h2>

        <p className="text-gray-300 mb-10">
          A personalized snapshot of your astrological energies, trends, and insights.
        </p>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-black/30 rounded-xl border border-[var(--color-cosmic-gold)] hover:bg-black/40 transition-colors cursor-pointer">
            <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              Daily Insights
            </h3>
            <p className="text-gray-400">Your planetary influences for today.</p>
          </div>

          <div className="p-6 bg-black/30 rounded-xl border border-[var(--color-cosmic-gold)] hover:bg-black/40 transition-colors cursor-pointer">
            <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              Birth Chart
            </h3>
            <p className="text-gray-400">Explore your natal chart and placements.</p>
          </div>

          <div className="p-6 bg-black/30 rounded-xl border border-[var(--color-cosmic-gold)] hover:bg-black/40 transition-colors cursor-pointer">
            <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              Predictions
            </h3>
            <p className="text-gray-400">AI‑powered forecasts based on Vedic astrology.</p>
          </div>
        </div>

        {/* Placeholder for future charts */}
        <div className="p-10 bg-black/20 rounded-xl border border-gray-700 text-gray-400 text-center shadow-inner">
          Charts & insights coming soon.
        </div>
      </div>
    </LuxuryLayout>
  );
}
