'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Frame {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  skew: number;
  isActive: boolean;
}

interface FrameSystemProps {
  onFrameClick?: (frameId: string) => void;
}

export default function FrameSystem({ onFrameClick }: FrameSystemProps) {
  const router = useRouter();

  const [frames] = useState<Frame[]>([
    {
      id: 'salle',
      title: 'salle',
      x: 290, // Ajusté pour le centre géométrique du cadre oblique
      y: 130, // Remonté de 20 pixels
      width: 160, // 200 * 0.8
      height: 240, // 300 * 0.8
      skew: 5,
      isActive: false,
    },
    {
      id: 'maison',
      title: 'maison',
      x: 470, // Ajusté pour le centre géométrique du cadre oblique
      y: 130,
      width: 160, // 200 * 0.8
      height: 240, // 300 * 0.8
      skew: 5,
      isActive: false,
    },
    {
      id: 'vos-questions',
      title: 'vos\nquestions',
      x: 311, // Aligné diagonalement
      y: 400, // Remonté de 20 pixels
      width: 160, // 200 * 0.8
      height: 240, // 300 * 0.8
      skew: 5,
      isActive: false,
    },
    {
      id: 'nutrition',
      title: 'nutrition',
      x: 491, // Aligné diagonalement
      y: 400,
      width: 160, // 200 * 0.8
      height: 240, // 300 * 0.8
      skew: 5,
      isActive: false,
    },
    {
      id: 'outils',
      title: 'outils',
      x: 332, // Aligné diagonalement
      y: 670, // Remonté de 20 pixels
      width: 160, // 200 * 0.8
      height: 240, // 300 * 0.8
      skew: 5,
      isActive: false,
    },
    {
      id: 'programmes-gratuits',
      title: 'programmes\ngratuits',
      x: 512, // Aligné diagonalement
      y: 670,
      width: 160, // 200 * 0.8
      height: 240, // 300 * 0.8
      skew: 5,
      isActive: false,
    }
  ]);

  const handleFrameClick = (frameId: string) => {
    // Navigation vers les pages correspondantes
    switch (frameId) {
      case 'salle':
        router.push('/salle');
        break;
      case 'maison':
        router.push('/maison');
        break;
      case 'vos-questions':
        router.push('/vos-questions');
        break;
      case 'nutrition':
        router.push('/nutrition');
        break;
      case 'outils':
        router.push('/outils');
        break;
      case 'programmes-gratuits':
        router.push('/programmes-gratuits');
        break;
      default:
        console.log(`Frame clicked: ${frameId}`);
    }

    if (onFrameClick) {
      onFrameClick(frameId);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {frames.map((frame) => (
        <div
          key={frame.id}
          className={`
            absolute cursor-pointer pointer-events-auto
            border-2 border-white/30 hover:border-orange-400 hover:shadow-orange-400/70 hover:shadow-xl hover:shadow-[0_0_25px_rgba(251,146,60,0.6),0_0_50px_rgba(251,146,60,0.4),0_0_75px_rgba(251,146,60,0.2)] hover:scale-105
            bg-gradient-to-b from-blue-800 via-blue-600 via-cyan-500 to-cyan-300 hover:opacity-80
            backdrop-blur-sm
            transition-all duration-300 ease-in-out
            flex items-center justify-center
            ${frame.isActive ? 'border-white/80 opacity-90' : ''}
          `}
          style={{
            left: frame.x,
            top: frame.y,
            width: frame.width,
            height: frame.height,
            transform: `skew(${frame.skew}deg)`,
          }}
          onClick={() => handleFrameClick(frame.id)}
        >
          <div
            className="text-white font-bold text-2xl select-none flex flex-col items-center justify-center w-full h-full text-center leading-tight"
            style={{
              transform: `skew(${-frame.skew}deg)`, // Contre-inclinaison pour garder le texte droit
              fontFamily: "'Fira Code', 'JetBrains Mono', 'Space Mono', 'SF Mono', monospace",
              whiteSpace: 'pre-line', // Pour respecter les \n dans le texte
            }}
          >
            {frame.title}
          </div>
        </div>
      ))}
    </div>
  );
}
