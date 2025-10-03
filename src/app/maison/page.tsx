'use client';

import { useRouter } from 'next/navigation';
import ParticleEffect from '@/components/ParticleEffect';

export default function MaisonPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-900 via-blue-700 to-cyan-500">
      <ParticleEffect />
      {/* Titre Léviathan coaching - même position que sur la page principale */}
      <div className="fixed top-8 left-1/3 transform -translate-x-1/2 z-30 pointer-events-none">
        <h1 className="text-white text-6xl font-bold drop-shadow-2xl"
            style={{
              fontFamily: "'Fira Code', 'JetBrains Mono', 'Space Mono', 'SF Mono', monospace",
              textShadow: '0 0 20px rgba(255,255,255,0.5)',
            }}>
          Léviathan coaching
        </h1>
      </div>

      <div className="flex flex-col items-center text-center px-8 pt-32" style={{ marginLeft: '-400px' }}>
        <h2 className="text-white text-6xl font-bold mb-16"
            style={{
              fontFamily: "'Fira Code', 'JetBrains Mono', 'Space Mono', 'SF Mono', monospace",
            }}>
          maison
        </h2>

      {/* Bouton Retour stylisé comme les cadres */}
      <div
        className="fixed top-8 left-8 cursor-pointer pointer-events-auto border-2 border-white/30 hover:border-orange-400 hover:shadow-orange-400/70 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center"
        style={{
          width: '160px',
          height: '80px',
          transform: 'skew(5deg)',
          background: 'linear-gradient(to bottom, rgb(51 65 85), rgb(30 64 175), rgb(6 182 212), rgb(6 182 212))',
        }}
        onClick={() => router.back()}
      >
        <span
          className="text-white font-bold text-xl select-none"
          style={{
            transform: 'skew(-5deg)',
            fontFamily: "'Fira Code', 'JetBrains Mono', 'Space Mono', 'SF Mono', monospace",
          }}
        >
          Retour
        </span>
      </div>
      </div>
    </div>
  );
}
