
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import LandingHero from '@/components/LandingHero';
import AICopilot from '@/components/AICopilot';
import DashboardSidebar from '@/components/DashboardSidebar';
import Dashboard from '@/components/Dashboard';
import BusinessLaunch from '@/components/BusinessLaunch';
import ComplianceHub from '@/components/ComplianceHub';
import Operations from '@/components/Operations';
import KnowledgeHub from '@/components/KnowledgeHub';

const Index = () => {
  const [viewMode, setViewMode] = useState('landing'); // 'landing' or 'dashboard'
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderDashboardContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'launch':
        return <BusinessLaunch />;
      case 'compliance':
        return <ComplianceHub />;
      case 'operations':
        return <Operations />;
      case 'knowledge':
        return <KnowledgeHub />;
      default:
        return <Dashboard />;
    }
  };

  if (viewMode === 'landing') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <LandingHero />
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything Your Business Needs in One Platform
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From business registration to growth optimization, BizCore handles every aspect of your entrepreneurial journey.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Guided Setup",
                  description: "Get personalized guidance for CAC registration, licensing, and compliance setup",
                  icon: "🤖"
                },
                {
                  title: "Smart Compliance",
                  description: "Automated tracking of NDPR, tax obligations, and renewal deadlines",
                  icon: "✅"
                },
                {
                  title: "Financial Management",
                  description: "Invoicing, bookkeeping, payroll, and financial reporting made simple",
                  icon: "💰"
                },
                {
                  title: "HR & Team Tools",
                  description: "Employee management, contracts, performance tracking, and payroll automation",
                  icon: "👥"
                },
                {
                  title: "Growth Marketing",
                  description: "AI-powered content creation, campaign management, and customer insights",
                  icon: "📈"
                },
                {
                  title: "Expert Knowledge",
                  description: "Access to legal templates, business guides, and Nigerian market insights",
                  icon: "📚"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-900">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Your Dream Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of Nigerian entrepreneurs who've transformed their ideas into thriving businesses with BizCore.
            </p>
            <button 
              onClick={() => setViewMode('dashboard')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Start Your Business Journey → (Demo)
            </button>
            <p className="text-blue-200 text-sm mt-4">30-day free trial • No credit card required</p>
          </div>
        </section>

        <AICopilot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <div className="flex-1 overflow-auto">
        {renderDashboardContent()}
      </div>
      <AICopilot />
      
      {/* Demo Mode Indicator */}
      <div className="fixed top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg z-40">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Demo Mode</span>
          <button 
            onClick={() => setViewMode('landing')}
            className="ml-2 text-emerald-200 hover:text-white text-sm underline"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
