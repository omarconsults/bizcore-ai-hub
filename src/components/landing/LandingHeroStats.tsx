
import React from 'react';
import { Users, TrendingUp, Shield, Clock } from 'lucide-react';

const LandingHeroStats = () => {
  const stats = [
    { number: "5K+", label: "Businesses Launched", icon: Users },
    { number: "₦200M+", label: "Revenue Generated", icon: TrendingUp },
    { number: "99.8%", label: "Compliance Success", icon: Shield },
    { number: "72hrs", label: "Avg. Setup Time", icon: Clock }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center p-3 sm:p-4 lg:p-6 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
          <stat.icon className="mx-auto text-violet-400 mb-2 sm:mb-3 lg:mb-4" size={24} />
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stat.number}</div>
          <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default LandingHeroStats;
