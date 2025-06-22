
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

        {/* Trial Information Banner */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎁</span>
                <span className="font-semibold">10 Welcome Tokens</span>
              </div>
              <div className="hidden sm:block text-emerald-400">+</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <span className="font-semibold">100-Day Free Trial</span>
              </div>
              <div className="hidden sm:block text-emerald-400">+</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span className="font-semibold">25 Daily Tokens</span>
              </div>
            </div>
            <p className="text-slate-300 mt-3 text-sm">
              Over 2,500 tokens to explore all AI features completely free!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
