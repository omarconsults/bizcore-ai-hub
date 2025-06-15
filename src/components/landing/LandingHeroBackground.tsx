
import React from 'react';

const LandingHeroBackground = () => {
  return (
    <>
      {/* Enhanced animated background pattern */}
      <div className="absolute inset-0">
        {/* Main gradient orbs with enhanced animations */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-violet-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Additional floating orbs */}
        <div className="absolute top-1/3 right-1/3 w-24 sm:w-48 h-24 sm:h-48 bg-pink-500/10 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-20 sm:w-40 h-20 sm:h-40 bg-yellow-500/10 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '3s', animationDuration: '8s' }}></div>
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Moving gradient lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-cyan-500/30 to-transparent animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
      </div>
      
      {/* Enhanced grid overlay with animation */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px] animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 text-violet-400/20 text-4xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>⭐</div>
        <div className="absolute top-2/3 right-1/5 text-cyan-400/20 text-3xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}>💎</div>
        <div className="absolute bottom-1/4 left-2/3 text-emerald-400/20 text-5xl animate-bounce" style={{ animationDelay: '3s', animationDuration: '6s' }}>✨</div>
        <div className="absolute top-1/2 right-1/2 text-pink-400/20 text-2xl animate-bounce" style={{ animationDelay: '4s', animationDuration: '7s' }}>🚀</div>
      </div>
      
      {/* Pulsing rings */}
      <div className="absolute top-1/3 left-1/5 w-32 h-32 border border-violet-500/20 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-cyan-500/20 rounded-full animate-ping" style={{ animationDelay: '3s', animationDuration: '5s' }}></div>
    </>
  );
};

export default LandingHeroBackground;
