'use client';

import ParticleEffect from '@/components/ParticleEffect';
import FrameSystem from '@/components/FrameSystem';
import PhotoFrame from '@/components/PhotoFrame';

export default function Home() {
  const handleFrameClick = (frameId: string) => {
    console.log(`Frame clicked: ${frameId}`);
    // Ici on pourra gérer la navigation ou l'ouverture de contenu
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-900 via-blue-700 to-cyan-500">
      {/* Titre Léviathan coaching */}
      <div className="fixed top-8 left-1/3 transform -translate-x-1/2 z-30 pointer-events-none">
        <h1 className="text-white text-6xl font-bold text-center drop-shadow-2xl"
            style={{
              fontFamily: "'Fira Code', 'JetBrains Mono', 'Space Mono', 'SF Mono', monospace",
              textShadow: '0 0 20px rgba(255,255,255,0.5)',
            }}>
          Léviathan coaching
        </h1>
      </div>

      <ParticleEffect />
      <FrameSystem onFrameClick={handleFrameClick} />
      <PhotoFrame />
    </div>
  );
}
