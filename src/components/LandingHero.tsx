
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Users, Shield, TrendingUp } from 'lucide-react';

const LandingHero = () => {
  const features = [
    "AI-guided business setup & CAC registration",
    "Automated compliance tracking (NDPR, Tax, Licenses)",
    "Smart bookkeeping & invoicing tools",
    "HR management & payroll automation"
  ];

  const stats = [
    { number: "10K+", label: "Businesses Launched", icon: Users },
    { number: "99%", label: "Compliance Success", icon: Shield },
    { number: "45%", label: "Faster Growth", icon: TrendingUp }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-emerald-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
              🇳🇬 Built specifically for Nigerian businesses
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your AI-Powered 
              <span className="text-blue-900"> Business</span>
              <br />
              <span className="text-emerald-600">Operating System</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              From idea to IPO — BizCore handles CAC registration, compliance, operations, and growth. 
              The only platform Nigerian entrepreneurs need to build legitimate, scalable businesses.
            </p>

            {/* Feature List */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-emerald-600 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 text-lg">
                Start Your Business Journey
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50 px-8 py-3 text-lg">
                Watch Demo (2 min)
              </Button>
            </div>

            {/* Social Proof */}
            <p className="text-sm text-gray-500">
              Trusted by 10,000+ Nigerian entrepreneurs • 4.9/5 rating • Free 30-day trial
            </p>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-white p-6">
                  {/* Mock Dashboard Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Welcome back, Adaora! 👋</h3>
                      <p className="text-gray-600">Let's grow Adaora's Fashion House</p>
                    </div>
                    <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                      Fully Compliant ✓
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <stat.icon className="mx-auto text-blue-900 mb-2" size={24} />
                        <div className="text-2xl font-bold text-blue-900">{stat.number}</div>
                        <div className="text-xs text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Tasks */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <CheckCircle className="text-emerald-600" size={20} />
                      <span className="text-sm text-gray-700">CAC Business Registration</span>
                      <span className="ml-auto text-emerald-600 text-sm font-medium">Complete</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-700">TIN Registration</span>
                      <span className="ml-auto text-blue-600 text-sm font-medium">In Progress</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                      <span className="text-sm text-gray-700">NDPR Compliance Setup</span>
                      <span className="ml-auto text-gray-500 text-sm">Pending</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating AI Assistant */}
            <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white p-3 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">AI Assistant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
