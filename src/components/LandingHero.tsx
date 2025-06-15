
import React from 'react';
import LandingHeroBackground from './landing/LandingHeroBackground';
import LandingHeroContent from './landing/LandingHeroContent';
import LandingHeroDashboard from './landing/LandingHeroDashboard';

const LandingHero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 overflow-hidden">
      {/* Ensure minimum height to prevent layout shifts */}
      <div className="absolute inset-0 min-h-[100vh]">
        <LandingHeroBackground />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content with staggered animation */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <LandingHeroContent />
          </div>

          {/* Right Content with delayed animation */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <LandingHeroDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
