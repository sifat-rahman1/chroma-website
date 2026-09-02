'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1,700ms solid display + 300ms GPU fade-out (2.00s max total)
    const fadeTimer = setTimeout(() => setIsFading(true), 1700);
    const removeTimer = setTimeout(() => setIsVisible(false), 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#fcfbfe] dark:bg-[#080511] transition-opacity duration-300 ease-in-out transform-gpu ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <style>{`
        .three-body {
          --uib-size: 64px;
          --uib-speed: 0.8s;
          --uib-color: #7e22ce;
          position: relative;
          display: inline-block;
          height: var(--uib-size);
          width: var(--uib-size);
          animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
        }

        .three-body__dot {
          position: absolute;
          height: 100%;
          width: 30%;
        }

        .three-body__dot:after {
          content: '';
          position: absolute;
          height: 0%;
          width: 100%;
          padding-bottom: 100%;
          background-color: var(--uib-color);
          border-radius: 50%;
        }

        .three-body__dot:nth-child(1) {
          bottom: 5%;
          left: 0;
          transform: rotate(60deg);
          transform-origin: 50% 85%;
        }

        .three-body__dot:nth-child(1)::after {
          bottom: 0;
          left: 0;
          animation: wobble1 var(--uib-speed) infinite ease-in-out;
          animation-delay: calc(var(--uib-speed) * -0.3);
        }

        .three-body__dot:nth-child(2) {
          bottom: 5%;
          right: 0;
          transform: rotate(-60deg);
          transform-origin: 50% 85%;
        }

        .three-body__dot:nth-child(2)::after {
          bottom: 0;
          left: 0;
          animation: wobble1 var(--uib-speed) infinite
            calc(var(--uib-speed) * -0.15) ease-in-out;
        }

        .three-body__dot:nth-child(3) {
          bottom: -5%;
          left: 0;
          transform: translateX(116.666%);
        }

        .three-body__dot:nth-child(3)::after {
          top: 0;
          left: 0;
          animation: wobble2 var(--uib-speed) infinite ease-in-out;
        }

        @keyframes spin78236 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes wobble1 {
          0%,
          100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-66%) scale(0.65);
            opacity: 0.8;
          }
        }

        @keyframes wobble2 {
          0%,
          100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(66%) scale(0.65);
            opacity: 0.8;
          }
        }
      `}</style>

      <div className="relative flex items-center justify-center">
        {/* Soft Background Glow for Contrast */}
        <div className="absolute h-28 w-28 rounded-full bg-[#7e22ce]/15 blur-xl transform-gpu animate-pulse" />
        
        {/* Three-Body Orbital Loader */}
        <div className="three-body transform-gpu will-change-transform">
          <div className="three-body__dot" />
          <div className="three-body__dot" />
          <div className="three-body__dot" />
        </div>
      </div>
    </div>
  );
}