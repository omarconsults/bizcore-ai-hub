
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Users, Shield, TrendingUp, Zap, Clock, Award, Sparkles } from 'lucide-react';

const LandingHero = () => {
  const features = [
    "Complete CAC registration & business setup in 48 hours",
    "Automated NDPR, FIRS & state compliance monitoring",
    "AI-powered invoicing, bookkeeping & financial management",
    "Full HR suite with payroll, contracts & performance tracking",
    "Growth marketing tools with Nigerian market insights"
  ];

  const stats = [
    { number: "15K+", label: "Businesses Launched", icon: Users },
    { number: "₦2.5B+", label: "Revenue Generated", icon: TrendingUp },
    { number: "99.8%", label: "Compliance Success", icon: Shield },
    { number: "72hrs", label: "Avg. Setup Time", icon: Clock }
  ];

  const achievements = [
    { icon: Award, text: "Featured in TechCrunch Nigeria" },
    { icon: Zap, text: "45% faster business growth vs manual methods" },
    { icon: Shield, text: "Zero compliance violations in 2024" }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 overflow-hidden">
      {/* Modern background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-violet-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center bg-gradient-to-r from-violet-500/20 to-cyan-500/20 backdrop-blur-sm text-violet-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border border-violet-500/30">
              <Sparkles className="mr-2" size={14} />
              🇳🇬 #1 Business Platform in Nigeria • 15,000+ Users
            </div>
            
            <div className="space-y-4 sm:space-y-6">
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
                <span className="text-white font-semibold"> Join 15,000+ Nigerian entrepreneurs</span> building compliant, profitable businesses.
              </p>
            </div>

            {/* Achievement Badges */}
            <div className="space-y-3 sm:space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4 text-slate-300 group hover:text-white transition-colors justify-center lg:justify-start">
                  <div className="p-2 bg-violet-500/20 rounded-lg group-hover:bg-violet-500/30 transition-colors">
                    <achievement.icon className="text-violet-400" size={18} />
                  </div>
                  <span className="font-medium text-sm sm:text-base">{achievement.text}</span>
                </div>
              ))}
            </div>

            {/* Feature List */}
            <div className="space-y-3 sm:space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4 group text-left">
                  <div className="p-1 bg-cyan-500/20 rounded-full mt-1 group-hover:bg-cyan-500/30 transition-colors flex-shrink-0">
                    <CheckCircle className="text-cyan-400" size={16} />
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed group-hover:text-white transition-colors">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
              <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                Start Your Business Today
                <ArrowRight className="ml-3" size={20} />
              </Button>
              <Button variant="outline" className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 w-full sm:w-auto">
                Watch Demo (3 min)
              </Button>
            </div>

            {/* Social Proof */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4">
                <strong className="text-white">Trusted by Nigeria's fastest-growing businesses</strong>
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  4.9/5 rating
                </span>
                <span className="hidden sm:inline">•</span>
                <span>Free 30-day trial</span>
                <span className="hidden sm:inline">•</span>
                <span>No setup fees</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Dashboard Preview */}
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
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-3 sm:p-4 lg:p-6 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <stat.icon className="mx-auto text-violet-400 mb-2 sm:mb-3 lg:mb-4" size={24} />
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stat.number}</div>
                        <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>

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
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
