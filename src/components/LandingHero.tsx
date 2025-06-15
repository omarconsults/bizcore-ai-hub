
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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
      {/* Modern background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm text-emerald-300 px-6 py-3 rounded-full text-sm font-semibold border border-emerald-500/30">
              <Sparkles className="mr-2" size={16} />
              🇳🇬 #1 Business Platform in Nigeria • 15,000+ Active Users
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight">
                Launch & Scale
                <span className="block bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Your Business
                </span>
                <span className="block text-4xl lg:text-6xl text-emerald-400 font-medium">
                  in Record Time
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                The complete AI-powered business operating system that handles everything from CAC registration to IPO preparation. 
                <span className="text-white font-semibold"> Join 15,000+ Nigerian entrepreneurs</span> building compliant, profitable businesses.
              </p>
            </div>

            {/* Achievement Badges */}
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 text-slate-300 group hover:text-white transition-colors">
                  <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                    <achievement.icon className="text-emerald-400" size={20} />
                  </div>
                  <span className="font-medium">{achievement.text}</span>
                </div>
              ))}
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="p-1 bg-emerald-500/20 rounded-full mt-1 group-hover:bg-emerald-500/30 transition-colors">
                    <CheckCircle className="text-emerald-400" size={18} />
                  </div>
                  <span className="text-lg text-slate-300 leading-relaxed group-hover:text-white transition-colors">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                Start Your Business Today
                <ArrowRight className="ml-3" size={22} />
              </Button>
              <Button variant="outline" className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-10 py-6 text-xl font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300">
                Watch Success Stories (3 min)
              </Button>
            </div>

            {/* Social Proof */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
              <p className="text-sm text-slate-400 mb-4">
                <strong className="text-white">Trusted by Nigeria's fastest-growing businesses</strong>
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  4.9/5 rating
                </span>
                <span>•</span>
                <span>Free 30-day trial</span>
                <span>•</span>
                <span>No setup fees</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Dashboard Preview */}
          <div className="relative">
            <Card className="shadow-2xl border-0 overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-900/90 to-emerald-700/90 p-8 text-white backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Welcome back, Adaora! 👋</h3>
                      <p className="text-blue-200">Adaora's Fashion House • Est. 2024</p>
                    </div>
                    <div className="bg-emerald-500/30 backdrop-blur-sm text-emerald-100 px-4 py-2 rounded-full text-sm font-medium border border-emerald-400/30">
                      ✓ Fully Compliant
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">₦2,847,500</div>
                    <div className="text-blue-200 text-sm flex items-center gap-2">
                      <TrendingUp size={16} />
                      Monthly Revenue • ↗️ +127% growth
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-white/5 backdrop-blur-sm">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <stat.icon className="mx-auto text-blue-400 mb-4" size={32} />
                        <div className="text-2xl font-bold text-white">{stat.number}</div>
                        <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Tasks */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white mb-6 text-lg">Business Setup Progress</h4>
                    <div className="flex items-center gap-4 p-6 bg-emerald-500/20 rounded-2xl border border-emerald-500/30 backdrop-blur-sm">
                      <CheckCircle className="text-emerald-400" size={24} />
                      <div className="flex-1">
                        <span className="font-medium text-white block">CAC Business Registration</span>
                        <div className="text-sm text-emerald-300">Completed in 36 hours</div>
                      </div>
                      <span className="text-emerald-400 font-semibold bg-emerald-500/20 px-3 py-1 rounded-full text-sm">✓ Done</span>
                    </div>
                    <div className="flex items-center gap-4 p-6 bg-blue-500/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm">
                      <div className="w-6 h-6 rounded-full border-2 border-blue-400 flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-white block">FIRS TIN Registration</span>
                        <div className="text-sm text-blue-300">Auto-submitted • Processing</div>
                      </div>
                      <span className="text-blue-400 font-semibold bg-blue-500/20 px-3 py-1 rounded-full text-sm">⏱️ 2hrs left</span>
                    </div>
                    <div className="flex items-center gap-4 p-6 bg-orange-500/20 rounded-2xl border border-orange-500/30 backdrop-blur-sm">
                      <div className="w-6 h-6 rounded-full border-2 border-orange-400 flex items-center justify-center">
                        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-white block">Lagos State Business Permit</span>
                        <div className="text-sm text-orange-300">Ready to submit</div>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs rounded-xl">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating AI Assistant */}
            <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 rounded-3xl shadow-2xl border border-emerald-400/30 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <div>
                  <div className="font-semibold">AI Business Assistant</div>
                  <div className="text-emerald-200 text-sm">Ready to help you grow</div>
                </div>
              </div>
            </div>

            {/* Floating Success Metrics */}
            <div className="absolute -top-6 -left-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20">
              <div className="text-xs text-slate-400">This Month</div>
              <div className="font-bold text-emerald-400 text-lg">₦847K Revenue</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1">
                <TrendingUp size={12} />
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
