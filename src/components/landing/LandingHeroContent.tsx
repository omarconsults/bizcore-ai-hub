
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Sparkles, Award, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const LandingHeroContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartBusiness = () => {
    if (user) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  const features = [
    "Complete CAC registration & business setup in 5 days",
    "Automated NDPR, FIRS & state compliance monitoring",
    "AI-powered invoicing, bookkeeping & financial management",
    "Full HR suite with payroll, contracts & performance tracking",
    "Growth marketing tools with Nigerian market insights"
  ];

  const achievements = [
    { icon: Award, text: "Featured in Tech and Business Media" },
    { icon: Zap, text: "45% faster business growth vs manual methods" },
    { icon: Shield, text: "Zero compliance violations in 2024" }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
      {/* Badge with initial animation */}
      <div className="inline-flex items-center bg-gradient-to-r from-violet-500/20 to-cyan-500/20 backdrop-blur-sm text-violet-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border border-violet-500/30 animate-fade-in"
           style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        <Sparkles className="mr-2" size={14} />
        🇳🇬 #AI-powered business OS • 
      </div>
      
      {/* Main heading with staggered animation */}
      <div className="space-y-4 sm:space-y-6 animate-fade-in" 
           style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[0.9] tracking-tight">
          Launch & Scale
          <span className="block bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Your Business
          </span>
          <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-cyan-400 font-medium mt-2">
            in Record Time
          </span>
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
          The complete AI-powered business operating system that handles everything from CAC registration to IPO preparation. 
          <span className="text-white font-semibold"> Join Startups and Entrepreneurs</span> building compliant, profitable businesses.
        </p>
      </div>

      {/* Achievement Badges with sequential animation */}
      <div className="space-y-3 sm:space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} 
               className="flex items-center gap-3 sm:gap-4 text-slate-300 group hover:text-white transition-colors justify-center lg:justify-start animate-fade-in"
               style={{ animationDelay: `${0.3 + index * 0.1}s`, animationFillMode: 'both' }}>
            <div className="p-2 bg-violet-500/20 rounded-lg group-hover:bg-violet-500/30 transition-colors">
              <achievement.icon className="text-violet-400" size={18} />
            </div>
            <span className="font-medium text-sm sm:text-base">{achievement.text}</span>
          </div>
        ))}
      </div>

      {/* Feature List with sequential animation */}
      <div className="space-y-3 sm:space-y-4">
        {features.map((feature, index) => (
          <div key={index} 
               className="flex items-start gap-3 sm:gap-4 group text-left animate-fade-in"
               style={{ animationDelay: `${0.6 + index * 0.1}s`, animationFillMode: 'both' }}>
            <div className="p-1 bg-cyan-500/20 rounded-full mt-1 group-hover:bg-cyan-500/30 transition-colors flex-shrink-0">
              <CheckCircle className="text-cyan-400" size={16} />
            </div>
            <span className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed group-hover:text-white transition-colors">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA Button with final animation */}
      <div className="pt-4 animate-fade-in"
           style={{ animationDelay: '1.1s', animationFillMode: 'both' }}>
        <Button 
          onClick={handleStartBusiness}
          className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
        >
          Start Your Business Today
          <ArrowRight className="ml-3" size={20} />
        </Button>
      </div>

      {/* Social Proof with final animation */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl animate-fade-in"
           style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
        <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4">
          <strong className="text-white">Trusted by Nigeria's fastest-growing businesses</strong>
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
          <span className="flex items-center gap-2">
            <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
            4.9/5 rating
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Free 100-day trial</span>
          <span className="hidden sm:inline">•</span>
          <span>No setup fees</span>
        </div>
      </div>
    </div>
  );
};

export default LandingHeroContent;
