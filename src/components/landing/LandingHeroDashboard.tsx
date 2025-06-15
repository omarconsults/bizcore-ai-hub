
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, TrendingUp } from 'lucide-react';
import LandingHeroStats from './LandingHeroStats';

const LandingHeroDashboard = () => {
  return (
    <div className="relative mt-8 lg:mt-0">
      <Card className="shadow-2xl border-0 overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-violet-900/90 to-cyan-700/90 p-4 sm:p-6 lg:p-8 text-white backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Welcome back, Adaora! 👋</h3>
                <p className="text-violet-200 text-sm sm:text-base">Adaora's Fashion House • Est. 2024</p>
              </div>
              <div className="bg-emerald-500/30 backdrop-blur-sm text-emerald-100 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-emerald-400/30">
                ✓ Fully Compliant
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">₦2,847,500</div>
              <div className="text-violet-200 text-xs sm:text-sm flex items-center gap-2">
                <TrendingUp size={14} />
                Monthly Revenue • ↗️ +127% growth
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-sm">
            {/* Stats Grid */}
            <LandingHeroStats />

            {/* Progress Tasks */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-white mb-4 sm:mb-6 text-base sm:text-lg">Business Setup Progress</h4>
              <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-emerald-500/20 rounded-xl sm:rounded-2xl border border-emerald-500/30 backdrop-blur-sm">
                <CheckCircle className="text-emerald-400 flex-shrink-0" size={20} />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-white block text-sm sm:text-base">CAC Business Registration</span>
                  <div className="text-xs sm:text-sm text-emerald-300">Completed in 36 hours</div>
                </div>
                <span className="text-emerald-400 font-semibold bg-emerald-500/20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">✓ Done</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-violet-500/20 rounded-xl sm:rounded-2xl border border-violet-500/30 backdrop-blur-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-violet-400 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-violet-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-white block text-sm sm:text-base">FIRS TIN Registration</span>
                  <div className="text-xs sm:text-sm text-violet-300">Auto-submitted • Processing</div>
                </div>
                <span className="text-violet-400 font-semibold bg-violet-500/20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">⏱️ 2hrs left</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-orange-500/20 rounded-xl sm:rounded-2xl border border-orange-500/30 backdrop-blur-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-orange-400 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-white block text-sm sm:text-base">Lagos State Business Permit</span>
                  <div className="text-xs sm:text-sm text-orange-300">Ready to submit</div>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs rounded-xl px-3 py-1">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floating AI Assistant */}
      <div className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-cyan-400/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-300 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div>
            <div className="font-semibold text-sm sm:text-base">AI Assistant</div>
            <div className="text-cyan-200 text-xs sm:text-sm">Ready to help</div>
          </div>
        </div>
      </div>

      {/* Floating Success Metrics */}
      <div className="absolute -top-3 sm:-top-6 -left-3 sm:-left-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-white/20">
        <div className="text-xs text-slate-400">This Month</div>
        <div className="font-bold text-emerald-400 text-sm sm:text-lg">₦847K Revenue</div>
        <div className="text-xs text-emerald-400 flex items-center gap-1">
          <TrendingUp size={10} />
          +67% growth
        </div>
      </div>
    </div>
  );
};

export default LandingHeroDashboard;
