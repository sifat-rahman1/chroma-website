'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Initiate fade-out at 1.7s to complete full unmount at 2.00s max
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1700);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#080511] transition-opacity duration-300 ease-in-out transform-gpu ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 60fps Hardware-Accelerated Loader */}
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Glow */}
        <div className="absolute h-16 w-16 rounded-full bg-[#7e22ce]/20 blur-md transform-gpu animate-pulse" />

        {/* Outer Orbit Ring */}
        <div className="h-14 w-14 rounded-full border-2 border-t-[#7e22ce] border-r-transparent border-b-[#7e22ce]/30 border-l-transparent animate-spin transform-gpu will-change-transform" />

        {/* Center Glowing Core */}
        <div className="absolute h-4 w-4 rounded-full bg-[#7e22ce] shadow-[0_0_12px_#7e22ce] transform-gpu will-change-transform animate-pulse" />
      </div>
    </div>
  );
}
