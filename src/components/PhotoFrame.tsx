'use client';

import { useEffect, useState } from 'react';

interface PhotoFrameProps {
  images?: string[];
}

export default function PhotoFrame({ images = [] }: PhotoFrameProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [offset, setOffset] = useState(0);

  // Ajouter les styles d'animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes orangePulse {
        0%, 100% {
          box-shadow: inset 4px 0 0 0 rgba(251,146,60,0.8), -4px 0 20px rgba(251,146,60,0.6), -8px 0 40px rgba(251,146,60,0.4);
        }
        50% {
          box-shadow: inset 4px 0 0 0 rgba(251,146,60,1), -4px 0 30px rgba(251,146,60,0.8), -8px 0 60px rgba(251,146,60,0.6);
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Couleurs carrées pour le prototype
  const squareColors = [
    '#1e3a8a', '#1e40af', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'
  ];

  const displayColors = images.length > 0 ? images : squareColors;
  const squareSize = dimensions.height / 2; // Carrés parfaits pour chaque rangée

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth * 0.45, // 45% de l'écran
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (squareSize > 0) {
      const interval = setInterval(() => {
        setOffset(prev => (prev + 1) % (squareSize * 3)); // Cycle basé sur la taille des carrés
      }, 30); // Vitesse du défilement

      return () => clearInterval(interval);
    }
  }, [squareSize]);

  return (
    <div
      className="fixed top-0 pointer-events-none z-10"
      style={{
        right: '-10%', // Fait déborder à droite de 10%
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      {/* Bordure animée au premier plan */}
      <div
        className="absolute inset-0 border-l-4 border-orange-400 pointer-events-none z-20"
        style={{
          transform: `skew(5deg)`,
          boxShadow: 'inset 4px 0 0 0 rgba(251,146,60,0.8), -4px 0 20px rgba(251,146,60,0.6), -8px 0 40px rgba(251,146,60,0.4)',
          animation: 'orangePulse 3s ease-in-out infinite',
        }}
      />

      {/* Contenu avec photos derrière */}
      <div
        className="w-full h-full bg-black/20 backdrop-blur-sm overflow-hidden relative z-10"
        style={{
          transform: `skew(5deg)`,
        }}
      >
        {/* Rangée supérieure - défile vers la droite */}
        <div
          className="absolute top-0 left-0 h-1/2 w-full flex"
          style={{
            transform: `skew(-5deg) translateX(-${offset}px)`,
          }}
        >
          {[...displayColors.slice(0, 3), ...displayColors.slice(0, 3), ...displayColors.slice(0, 3)].map((color, index) => (
            <div
              key={`top-${index}`}
              className="flex-shrink-0 border-2 border-white/30"
              style={{
                width: squareSize,
                height: squareSize,
                backgroundColor: color,
              }}
            />
          ))}
        </div>

        {/* Rangée inférieure - défile vers la gauche */}
        <div
          className="absolute bottom-0 left-0 h-1/2 w-full flex"
          style={{
            transform: `skew(-5deg) translateX(${offset}px)`,
          }}
        >
          {[...displayColors.slice(3, 6), ...displayColors.slice(3, 6), ...displayColors.slice(3, 6)].map((color, index) => (
            <div
              key={`bottom-${index}`}
              className="flex-shrink-0 border-2 border-white/30"
              style={{
                width: squareSize,
                height: squareSize,
                backgroundColor: color,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
