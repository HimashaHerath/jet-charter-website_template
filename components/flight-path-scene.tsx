'use client';

import { useEffect, useState } from 'react';

// Floating particle component
function FloatingParticle({ delay, duration, left, size }: {
  delay: number;
  duration: number;
  left: string;
  size: number;
}) {
  return (
    <div
      className="absolute rounded-full animate-float-up"
      style={{
        left,
        bottom: '-20px',
        width: size,
        height: size,
        background: 'radial-gradient(circle, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0) 70%)',
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

export function FlightPathScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
    left: `${Math.random() * 100}%`,
    size: 3 + Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient sky */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(232,200,170,0.3) 0%, rgba(210,175,140,0.2) 50%, rgba(225,190,160,0.4) 100%)',
        }}
      />

      {/* Ambient glow orb - top right */}
      <div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(232,194,136,0.4) 0%, rgba(232,194,136,0) 70%)',
        }}
      />

      {/* Secondary glow orb - center */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full animate-pulse-slower"
        style={{
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0) 60%)',
        }}
      />

      {/* Animated Flight Path SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Vapor gradient - soft gold */}
          <linearGradient id="vaporGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="20%" stopColor="#e8c288" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#e8c288" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>

          {/* Animated trail gradient */}
          <linearGradient id="animatedTrail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="60%" stopColor="#e8c288" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f5e6c8" stopOpacity="0.9" />
          </linearGradient>

          {/* Jet glow */}
          <radialGradient id="jetGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8e7" stopOpacity="1" />
            <stop offset="40%" stopColor="#d4af37" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="vaporGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="jetBlur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Define the flight path for animation */}
          <path
            id="flightPath1"
            d="M -50 480 Q 250 420 500 440 T 850 400 T 1250 340"
            fill="none"
          />

          <path
            id="flightPath2"
            d="M -80 550 Q 180 510 420 530 T 780 510 T 1280 460"
            fill="none"
          />
        </defs>

        {/* Background vapor layer - very soft */}
        <path
          className={`transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          d="M -100 450 Q 200 380 450 400 T 800 380 T 1300 320"
          fill="none"
          stroke="url(#vaporGold)"
          strokeWidth="100"
          strokeLinecap="round"
          filter="url(#softGlow)"
        />

        {/* Static vapor trail 1 */}
        <path
          className={`transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          d="M -50 480 Q 250 420 500 440 T 850 400 T 1250 340"
          fill="none"
          stroke="url(#vaporGold)"
          strokeWidth="50"
          strokeLinecap="round"
          filter="url(#vaporGlow)"
        />

        {/* Animated trail 1 - drawing effect */}
        <path
          className={`flight-trail-animate ${mounted ? 'animate' : ''}`}
          d="M -50 480 Q 250 420 500 440 T 850 400 T 1250 340"
          fill="none"
          stroke="url(#animatedTrail)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Static vapor trail 2 - lower */}
        <path
          className={`transition-opacity duration-1000 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          d="M -80 550 Q 180 510 420 530 T 780 510 T 1280 460"
          fill="none"
          stroke="url(#vaporGold)"
          strokeWidth="35"
          strokeLinecap="round"
          filter="url(#vaporGlow)"
        />

        {/* Animated trail 2 */}
        <path
          className={`flight-trail-animate-2 ${mounted ? 'animate' : ''}`}
          d="M -80 550 Q 180 510 420 530 T 780 510 T 1280 460"
          fill="none"
          stroke="url(#animatedTrail)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Animated Jet 1 - follows path 1 */}
        <g className={mounted ? 'jet-fly' : ''} filter="url(#jetBlur)">
          {/* Jet glow */}
          <circle r="15" fill="url(#jetGlow)">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#flightPath1" />
            </animateMotion>
          </circle>

          {/* Jet icon */}
          <g>
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#flightPath1" />
            </animateMotion>
            <path
              d="M -8 0 L 8 0 L 6 -1.5 L -6 -1.5 Z M -3 0 L -3 -4 L 0 -5.5 L 3 -4 L 3 0 M -6 0 L -6 2 L 0 1 L 6 2 L 6 0"
              fill="#c9a961"
              transform="rotate(0)"
            />
          </g>
        </g>

        {/* Animated Jet 2 - follows path 2, offset timing */}
        <g className={mounted ? 'jet-fly-2' : ''} filter="url(#jetBlur)">
          {/* Jet glow */}
          <circle r="12" fill="url(#jetGlow)" opacity="0.7">
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              rotate="auto"
              begin="3s"
            >
              <mpath href="#flightPath2" />
            </animateMotion>
          </circle>

          {/* Jet icon */}
          <g opacity="0.8">
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              rotate="auto"
              begin="3s"
            >
              <mpath href="#flightPath2" />
            </animateMotion>
            <path
              d="M -6 0 L 6 0 L 5 -1 L -5 -1 Z M -2 0 L -2 -3 L 0 -4 L 2 -3 L 2 0"
              fill="#b89a52"
              transform="rotate(0)"
            />
          </g>
        </g>

        {/* Sparkle effects along the path */}
        <circle r="4" fill="#fff8e7" opacity="0.8">
          <animateMotion
            dur="12s"
            repeatCount="indefinite"
          >
            <mpath href="#flightPath1" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0.3;0.9;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="2;5;2"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Floating particles */}
      {mounted && particles.map((p) => (
        <FloatingParticle key={p.id} {...p} />
      ))}

      {/* Subtle horizon line */}
      <div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[70vw] max-w-[900px] h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,169,97,0.3) 50%, transparent 100%)',
        }}
      />

      {/* Film grain overlay for premium feel */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
