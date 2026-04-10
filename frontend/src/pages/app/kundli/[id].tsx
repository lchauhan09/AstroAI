import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import api, { endpoints } from '../../../lib/api';
import Card from '../../../components/layout/Card';

export default function KundliDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [data, setData] = useState<any>(null);
  const [interpretation, setInterpretation] = useState<any>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const res = await api.get(endpoints.charts.details(Number(id)));
      setData(res.data);
    }
    fetchData();
  }, [id]);

  const generateInterpretation = async () => {
    setLoadingAI(true);
    try {
      const res = await api.post(endpoints.interpretations.generate(Number(id)));
      setInterpretation(res.data);
    } finally {
      setLoadingAI(false);
    }
  }

  if (!data) return <div className="min-h-screen bg-royal-navy flex items-center justify-center text-cosmic-gold">Aligning Stars...</div>;

  return (
    <div className="min-h-screen bg-royal-navy text-moonlight-white p-4 md:p-8">
      <Head>
        <title>Interpretation | {data.full_name}</title>
      </Head>

      <div className="max-w-5xl mx-auto pb-24">
        <header className="mb-8 flex justify-between items-center">
           <div onClick={() => router.back()} className="cursor-pointer text-ash-grey hover:text-cosmic-gold flex items-center gap-2">
             <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
             <span className="font-serif">Back to Dashboard</span>
           </div>
           <h1 className="font-serif text-2xl text-cosmic-gold">{data.full_name}'s Cosmic DNA</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Chart Column */}
           <div>
              <Card title="Birth Chart (North Indian)" className="mb-6 h-[400px] flex items-center justify-center relative">
                 {/* Visual placeholder for North Indian Chart */}
                 <div className="w-full h-full border border-cosmic-gold/30 relative flex items-center justify-center">
                    <div className="absolute w-full h-[1px] bg-cosmic-gold/20 rotate-45" />
                    <div className="absolute w-full h-[1px] bg-cosmic-gold/20 -rotate-45" />
                    <div className="absolute w-[70.7%] h-[70.7%] border border-cosmic-gold/20 rotate-45" />
                    <span className="text-cosmic-gold font-serif text-3xl opacity-50">Taurus Lagna</span>
                 </div>
              </Card>

              <Card title="Planetary Positions">
                 <div className="space-y-4">
                    {Object.entries(data.chart.planets).map(([p, info]: [any, any]) => (
                      <div key={p} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                         <span className="font-medium text-white">{p}</span>
                         <span className="text-ash-grey uppercase">{info.sign}</span>
                         <span className="font-mono text-cosmic-gold">{info.degree.toFixed(2)}°</span>
                      </div>
                    ))}
                 </div>
              </Card>
           </div>

           {/* Interpretation Column */}
           <div className="space-y-6">
              {!interpretation ? (
                <div 
                  onClick={generateInterpretation}
                  className="bg-saffron-gold-grad cursor-pointer group p-12 rounded-2xl text-center shadow-2xl hover:shadow-saffron-500/20 transition-all active:scale-95"
                >
                  <div className="mb-4 inline-block transform group-hover:rotate-12 transition-transform">
                    <svg fill="currentColor" viewBox="0 0 20 20" className="w-16 h-16 text-white"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1zM8 16a1 1 0 011-1v-1a1 1 0 112 0v1a1 1 0 01-1 1H9a1 1 0 01-1-1z" /></svg>
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-2">Unlock Cosmic Purpose</h3>
                  <p className="text-white/80 text-sm mb-8 leading-relaxed">Let AstroAI analyze your specific planetary aspects and numerology vibrations for a one-of-a-kind wisdom report.</p>
                  <span className="bg-white/20 px-6 py-2 rounded-full font-bold uppercase text-xs tracking-tighter">
                    {loadingAI ? 'Aligning Wisdom Engine...' : 'Run Wow Analysis'}
                  </span>
                </div>
              ) : (
                <Card variant="gold" className="animate-fadeIn shadow-2xl">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 bg-saffron-glow rounded-full animate-pulse" />
                      <h3 className="font-serif text-xl">The AI Interpretation</h3>
                   </div>
                   <div className="space-y-8">
                      <div>
                        <h4 className="text-cosmic-gold text-xs uppercase tracking-widest mb-2">Core Personality</h4>
                        <p className="text-sm leading-relaxed text-moonlight-white/90">{interpretation.core_personality}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <h4 className="text-ash-grey text-[10px] uppercase mb-2">Strengths</h4>
                            <ul className="text-xs space-y-1">
                               {interpretation.strengths.map((s: string) => <li key={s} className="flex items-center gap-2">
                                 <span className="w-1 h-1 bg-emerald-green rounded-full" /> {s}
                               </li>)}
                            </ul>
                         </div>
                         <div>
                            <h4 className="text-ash-grey text-[10px] uppercase mb-2">Challenges</h4>
                            <ul className="text-xs space-y-1">
                               {interpretation.challenges.map((c: string) => <li key={c} className="flex items-center gap-2">
                                 <span className="w-1 h-1 bg-lotus-pink rounded-full" /> {c}
                               </li>)}
                            </ul>
                         </div>
                      </div>

                      <div className="p-4 bg-saffron-glow/10 border border-saffron-glow/20 rounded-xl">
                        <h4 className="text-saffron-glow text-xs font-bold uppercase mb-2">Current Dasha Insight</h4>
                        <p className="text-xs leading-relaxed italic">{interpretation.current_dasha_impact}</p>
                      </div>

                      <div className="border-t border-white/5 pt-6 mt-4">
                        <h4 className="text-cosmic-gold text-[10px] uppercase mb-1">Cosmic Guidance</h4>
                        <p className="text-sm">{interpretation.guidance}</p>
                      </div>
                   </div>
                </Card>
              )}

              <Card variant="maroon" title="Numerology Signature">
                 <div className="grid grid-cols-2 gap-8 mb-6">
                    <div className="text-center">
                       <p className="text-[10px] text-ash-grey uppercase">Life Path</p>
                       <p className="text-4xl font-mono text-cosmic-gold">{data.numerology.life_path_number}</p>
                    </div>
                    <div className="text-center">
                       <p className="text-[10px] text-ash-grey uppercase">Destiny</p>
                       <p className="text-4xl font-mono text-cosmic-gold">{data.numerology.destiny_number}</p>
                    </div>
                 </div>
                 <div className="bg-black/20 p-4 rounded-xl text-center">
                    <p className="text-[10px] text-ash-grey uppercase mb-1">Soul Urge</p>
                    <p className="font-serif italic text-sm">"The Master Builder Vibration"</p>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
}
