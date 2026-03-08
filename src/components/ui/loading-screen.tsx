"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  fullScreen?: boolean;
}

const LoadingScreen = ({ fullScreen = true }: LoadingScreenProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const storedTheme = localStorage.getItem('kadaknath-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(storedTheme === 'dark' || (!storedTheme && prefersDark));
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center ${isDark ? 'bg-[#0B0B0B]' : 'bg-[#F6F6F6]'} ${fullScreen ? 'fixed inset-0 z-[100]' : 'w-full py-20'}`}>
      <div className="relative">
        {/* Outer Spinning Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-brand-gold/20 border-t-brand-gold rounded-full"
        />

        {/* Pulsing Logo Placeholder */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-10 h-10 bg-brand-gold rounded-xl shadow-lg shadow-brand-gold/40 flex items-center justify-center overflow-hidden">
             <img src="/logo.svg" alt="Logo" className="w-6 h-6 brightness-0" />
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold animate-pulse"
      >
        Kadaknath Pro
      </motion.p>
    </div>
  );
};

export default LoadingScreen;