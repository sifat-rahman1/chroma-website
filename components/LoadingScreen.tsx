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
        .walrus-loader {
          width: 64px;
          height: 64px;
          display: grid;
          border: 4px solid transparent;
          border-radius: 50%;
          border-color: rgba(126, 34, 206, 0.2) transparent;
          animation: walrus-spin 1.2s infinite linear;
        }
        .walrus-loader::before,
        .walrus-loader::after {
          content: "";
          grid-area: 1/1;
          margin: 4px;
          border: inherit;
          border-radius: 50%;
        }
        .walrus-loader::before {
          border-color: #7e22ce transparent;
          animation: walrus-spin 0.6s infinite linear reverse;
        }
        .walrus-loader::after {
          margin: 10px;
          border-color: rgba(126, 34, 206, 0.6) transparent;
          animation: walrus-spin 1.8s infinite linear;
        }
        @keyframes walrus-spin {
          100% {
            transform: rotate(1turn);
          }
        }
      `}</style>

      <div className="relative flex items-center justify-center">
        {/* Soft Background Glow for Contrast */}
        <div className="absolute h-28 w-28 rounded-full bg-[#7e22ce]/15 blur-xl transform-gpu animate-pulse" />
        
        {/* Tidy Walrus 92 Multi-Ring Spinner */}
        <div className="walrus-loader transform-gpu will-change-transform" />
      </div>
    </div>
  );
}
