'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  type: 'bubble' | 'ember';
  twinkleSpeed: number;
}

export default function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const isInitializedRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialiser des particules partout dans l'écran
    const initializeParticles = () => {
      if (isInitializedRef.current) return;

      const initialParticles: Particle[] = [];
      const particleCount = 15; // Nombre de particules initiales

      for (let i = 0; i < particleCount; i++) {
        // Créer des particules d'initialisation (partout dans l'écran)
        const isBubble = Math.random() > 0.5;
        const particleColors = [
          '#ffffff', '#1e3a8a', '#1e40af', '#2563eb',
          '#0d9488', '#14b8a6', '#2dd4bf'
        ];

        initialParticles.push({
          id: Math.random(),
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height, // Partout dans l'écran
          vx: (Math.random() - 0.5) * 0.5,
          vy: -(Math.random() * 0.5 + 0.3),
          size: Math.random() * 3 + 1,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          opacity: Math.random() * 0.8 + 0.2,
          type: isBubble ? 'bubble' : 'ember',
          twinkleSpeed: Math.random() * 0.05 + 0.01,
        });
      }

      particlesRef.current = initialParticles;
      isInitializedRef.current = true;
    };

    initializeParticles();

    const createParticle = (): Particle => {
      const isBubble = Math.random() > 0.5;
      const particleColors = [
        '#ffffff', // Blanc
        '#1e3a8a', '#1e40af', '#2563eb', // Bleus
        '#0d9488', '#14b8a6', '#2dd4bf'  // Turquoises
      ];

      return {
        id: Math.random(),
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100, // Toujours générer en bas
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 0.5 + 0.3),
        size: Math.random() * 3 + 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        opacity: Math.random() * 0.8 + 0.2,
        type: isBubble ? 'bubble' : 'ember',
        twinkleSpeed: Math.random() * 0.05 + 0.01,
      };
    };

    const updateParticles = () => {
      particlesRef.current = particlesRef.current
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          opacity: particle.opacity + Math.sin(Date.now() * particle.twinkleSpeed) * 0.1,
          vx: particle.type === 'bubble' ? particle.vx + (Math.random() - 0.5) * 0.01 : particle.vx,
          vy: particle.type === 'ember' ? Math.max(particle.vy + Math.sin(Date.now() * 0.001) * 0.1, -0.2) : particle.vy,
        }))
        .filter(particle => particle.y > -50 && particle.opacity > 0);
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, particle.opacity));

        if (particle.type === 'bubble') {
          // Dessiner une bulle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();

          // Ajouter un reflet
          ctx.beginPath();
          ctx.arc(particle.x - particle.size * 0.3, particle.y - particle.size * 0.3, particle.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fill();
        } else {
          // Dessiner une braise
          ctx.beginPath();
          const spikes = 8;
          const outerRadius = particle.size;
          const innerRadius = particle.size * 0.5;

          for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / spikes;
            const x = particle.x + Math.cos(angle) * radius;
            const y = particle.y + Math.sin(angle) * radius;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fillStyle = particle.color;
          ctx.fill();
        }

        ctx.restore();
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();

      // Ajouter de nouvelles particules occasionnellement (doublé)
      if (Math.random() < 0.2) {
        particlesRef.current.push(createParticle());
        particlesRef.current.push(createParticle()); // Deuxième particule pour doubler
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ background: 'transparent' }}
    />
  );
}
