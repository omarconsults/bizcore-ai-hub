
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Users, Shield, TrendingUp, Zap, Clock, Award } from 'lucide-react';

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
    <div className="bg-gradient-to-br from-blue-50 via-emerald-50 to-blue-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-emerald-200">
              🇳🇬 #1 Business Platform in Nigeria • 15,000+ Active Users
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Launch & Scale Your
              <span className="text-blue-900 block"> Nigerian Business</span>
              <span className="text-emerald-600 block text-4xl lg:text-5xl">in Record Time</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-10 leading-relaxed">
              The complete AI-powered business operating system that handles everything from CAC registration to IPO preparation. 
              <strong className="text-gray-900"> Used by 15,000+ Nigerian entrepreneurs</strong> to build compliant, profitable businesses faster than ever.
            </p>

            {/* Achievement Badges */}
            <div className="grid grid-cols-1 gap-3 mb-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700">
                  <achievement.icon className="text-emerald-600 flex-shrink-0" size={18} />
                  <span className="font-medium">{achievement.text}</span>
                </div>
              ))}
            </div>

            {/* Feature List */}
            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={22} />
                  <span className="text-lg text-gray-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-10">
              <Button className="bg-blue-900 hover:bg-blue-800 text-white px-10 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                Start Your Business Today
                <ArrowRight className="ml-3" size={22} />
              </Button>
              <Button variant="outline" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-10 py-4 text-xl font-semibold rounded-xl">
                Watch Success Stories (3 min)
              </Button>
            </div>

            {/* Social Proof */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                <strong>Trusted by Nigeria's fastest-growing businesses</strong>
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>⭐⭐⭐⭐⭐ 4.9/5 rating</span>
                <span>•</span>
                <span>Free 30-day trial</span>
                <span>•</span>
                <span>No setup fees</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Dashboard Preview */}
          <div className="relative">
            <Card className="shadow-2xl border-0 overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-900 to-emerald-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Welcome back, Adaora! 👋</h3>
                      <p className="text-blue-100">Adaora's Fashion House • Est. 2024</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                      ✓ Fully Compliant
                    </div>
                  </div>
                  <div className="text-3xl font-bold">₦2,847,500</div>
                  <div className="text-blue-100 text-sm">Monthly Revenue • ↗️ +127% growth</div>
                </div>

                <div className="p-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <stat.icon className="mx-auto text-blue-900 mb-3" size={28} />
                        <div className="text-2xl font-bold text-blue-900">{stat.number}</div>
                        <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Tasks */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-4">Business Setup Progress</h4>
                    <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <CheckCircle className="text-emerald-600" size={24} />
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">CAC Business Registration</span>
                        <div className="text-sm text-emerald-700">Completed in 36 hours</div>
                      </div>
                      <span className="text-emerald-600 font-semibold">✓ Done</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">FIRS TIN Registration</span>
                        <div className="text-sm text-blue-700">Auto-submitted • Processing</div>
                      </div>
                      <span className="text-blue-600 font-semibold">⏱️ 2hrs left</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div className="w-6 h-6 rounded-full border-2 border-orange-500 flex items-center justify-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">Lagos State Business Permit</span>
                        <div className="text-sm text-orange-700">Ready to submit</div>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-xs">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating AI Assistant */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 rounded-2xl shadow-xl border-4 border-white">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <div>
                  <div className="font-semibold text-sm">AI Business Assistant</div>
                  <div className="text-emerald-100 text-xs">Ready to help you grow</div>
                </div>
              </div>
            </div>

            {/* Floating Success Metrics */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-gray-200">
              <div className="text-xs text-gray-600">This Month</div>
              <div className="font-bold text-emerald-600">₦847K Revenue</div>
              <div className="text-xs text-emerald-600">↗️ +67% growth</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
