
import React from 'react';

const LandingHeroBackground = () => {
  return (
    <>
      {/* Stable background orbs with reduced animation intensity */}
      <div className="absolute inset-0">
        {/* Main gradient orbs with more subtle animations */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-violet-500/15 rounded-full blur-3xl opacity-60" 
             style={{ animation: 'pulse 8s ease-in-out infinite' }}></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/15 rounded-full blur-3xl opacity-60" 
             style={{ animation: 'pulse 10s ease-in-out infinite', animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-emerald-500/15 rounded-full blur-3xl opacity-60" 
             style={{ animation: 'pulse 12s ease-in-out infinite', animationDelay: '4s' }}></div>
        
        {/* Reduced floating orbs */}
        <div className="absolute top-1/3 right-1/3 w-24 sm:w-48 h-24 sm:h-48 bg-pink-500/10 rounded-full blur-2xl opacity-40" 
             style={{ animation: 'float 15s ease-in-out infinite', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-20 sm:w-40 h-20 sm:h-40 bg-yellow-500/10 rounded-full blur-2xl opacity-40" 
             style={{ animation: 'float 18s ease-in-out infinite', animationDelay: '3s' }}></div>
        
        {/* Reduced particle count for better performance */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        
        {/* Subtle gradient lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent opacity-50" 
             style={{ animation: 'shimmer 8s ease-in-out infinite' }}></div>
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-cyan-500/20 to-transparent opacity-50" 
             style={{ animation: 'shimmer 10s ease-in-out infinite', animationDelay: '2s' }}></div>
      </div>
      
      {/* Stable grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px] opacity-60"></div>
      
      {/* Reduced floating elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/6 text-violet-400/30 text-3xl" style={{ animation: 'float 20s ease-in-out infinite', animationDelay: '1s' }}>⭐</div>
        <div className="absolute top-2/3 right-1/5 text-cyan-400/30 text-2xl" style={{ animation: 'float 22s ease-in-out infinite', animationDelay: '2s' }}>💎</div>
        <div className="absolute bottom-1/4 left-2/3 text-emerald-400/30 text-4xl" style={{ animation: 'float 25s ease-in-out infinite', animationDelay: '3s' }}>✨</div>
        <div className="absolute top-1/2 right-1/2 text-pink-400/30 text-xl" style={{ animation: 'float 28s ease-in-out infinite', animationDelay: '4s' }}>🚀</div>
      </div>
      
      {/* Subtle pulsing rings */}
      <div className="absolute top-1/3 left-1/5 w-32 h-32 border border-violet-500/10 rounded-full opacity-40" 
           style={{ animation: 'ring-pulse 12s ease-in-out infinite', animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-cyan-500/10 rounded-full opacity-40" 
           style={{ animation: 'ring-pulse 15s ease-in-out infinite', animationDelay: '3s' }}></div>
    </>
  );
};

export default LandingHeroBackground;
