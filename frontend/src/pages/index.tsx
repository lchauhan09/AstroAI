import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-royal-navy text-moonlight-white overflow-hidden">
      <Head>
        <title>AstroAI | Ancient Wisdom. Modern Clarity.</title>
        <meta name="description" content="AI-Powered Vedic Astrology & Numerology" />
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        {/* Background Mandala Animation (Simulation) */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center overflow-hidden">
           <div className="w-[800px] h-[800px] border-[2px] border-cosmic-gold rounded-full animate-[spin_60s_linear_infinite]" />
           <div className="absolute w-[600px] h-[600px] border-[2px] border-dashed border-cosmic-gold rounded-full animate-[spin_45s_linear_reverse_infinite]" />
        </div>

        <div className="relative z-10 max-w-3xl animate-fadeIn">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Ancient Wisdom. <br/>
            <span className="text-cosmic-gold">Modern Clarity.</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-ash-grey mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover the hidden patterns of your life with AstroAI, the first Vedic astrology platform that combines high-precision ephemeris calculations with advanced AI-powered insights.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/signup">
              <span className="bg-saffron-gold-grad px-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-saffron-500/20 active:scale-95 transition-all cursor-pointer">
                Begin Your Journey
              </span>
            </Link>
            <Link href="#features">
              <span className="bg-transparent px-8 py-4 rounded-xl border border-cosmic-gold text-cosmic-gold font-bold text-lg hover:bg-cosmic-gold/5 transition-all cursor-pointer">
                Explore Features
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl mb-4">Precision Meets Intuition</h2>
          <p className="text-ash-grey">A revolutionary fusion of celestial data and psychological depth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cosmic-gold/40 transition-all">
             <div className="w-12 h-12 bg-cosmic-gold/10 rounded-full flex items-center justify-center mb-6 text-cosmic-gold">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
               </svg>
             </div>
             <h3 className="font-serif text-xl mb-3 text-cosmic-gold">Sidereal Engine</h3>
             <p className="text-sm text-ash-grey">High-precision Swiss Ephemeris calculations for traditional Vedic sidereal charts, Lahiri ayanamsa included.</p>
           </div>
           
           <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cosmic-gold/40 transition-all">
              <div className="w-12 h-12 bg-saffron-glow/10 rounded-full flex items-center justify-center mb-6 text-saffron-glow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-3 text-saffron-glow">AI Interpretations</h3>
              <p className="text-sm text-ash-grey">Get instant, remarkably precise personality and transit interpretations powered by our proprietary Astrology-tuned LLM engine.</p>
           </div>
           
           <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cosmic-gold/40 transition-all">
              <div className="w-12 h-12 bg-lotus-pink/10 rounded-full flex items-center justify-center mb-6 text-lotus-pink">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-3 text-lotus-pink">Numerology DNA</h3>
              <p className="text-sm text-ash-grey">Explore your Chaldean and Pythagorean vibrations, name corrections, and Life Path destiny with elegant data visualizations.</p>
           </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="bg-deep-maroon py-24 pb-32">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h2 className="font-serif text-4xl mb-6">Join the Inner Circle</h2>
          <p className="text-moonlight-white/80 mb-10">We are gradually onboarding new souls into the AstroAI community. Secure your spot on the waitlist today.</p>
          
          <form className="flex flex-col md:flex-row gap-4">
             <input 
               type="email" 
               placeholder="Enter your email" 
               className="flex-1 bg-royal-navy border border-cosmic-gold/30 rounded-xl px-6 py-4 focus:outline-none focus:border-cosmic-gold transition-all text-white" 
             />
             <button className="bg-saffron-gold-grad px-10 py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-saffron-500/20 whitespace-nowrap">
               Claim Early Access
             </button>
          </form>
        </div>
      </section>
    </div>
  );
}
