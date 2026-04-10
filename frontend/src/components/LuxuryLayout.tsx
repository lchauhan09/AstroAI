import React from "react";
import Link from "next/link";

export default function LuxuryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen text-white bg-slate-950"
      style={{ backgroundColor: "var(--color-luxury-bg)" }}
    >
      {/* Top Navigation */}
      <nav className="border-b border-[var(--color-cosmic-gold)] px-8 py-4 flex justify-between items-center">
        <h1
          className="text-2xl"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-cosmic-gold)" }}
        >
          AstroAI
        </h1>

        <div className="flex gap-6 text-gray-300">
          <Link href="/app/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/app/kundli" className="hover:text-white transition-colors">My Charts</Link>
          <Link href="/app/settings" className="hover:text-white transition-colors">Settings</Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="p-8">{children}</main>
    </div>
  );
}
