
import React from 'react';
import LandingHeroBackground from './landing/LandingHeroBackground';
import LandingHeroContent from './landing/LandingHeroContent';
import LandingHeroDashboard from './landing/LandingHeroDashboard';

const LandingHero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 overflow-hidden">
      <LandingHeroBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <LandingHeroContent />

          {/* Right Content - Enhanced Dashboard Preview */}
          <LandingHeroDashboard />
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
