import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import LandingHero from '@/components/LandingHero';
import AICopilot from '@/components/AICopilot';
import DashboardSidebar from '@/components/DashboardSidebar';
import Dashboard from '@/components/Dashboard';
import BusinessLaunch from '@/components/BusinessLaunch';
import ComplianceHub from '@/components/ComplianceHub';
import Operations from '@/components/Operations';
import KnowledgeHub from '@/components/KnowledgeHub';
import HRDashboard from '@/components/HRDashboard';
import Marketing from '@/components/Marketing';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('landing'); // 'landing' or 'dashboard'
  const [activeModule, setActiveModule] = useState('dashboard');

  // Debug logging
  useEffect(() => {
    console.log('Index component - user:', user);
    console.log('Index component - loading:', loading);
    console.log('Index component - viewMode:', viewMode);
    console.log('Index component - activeModule:', activeModule);
  }, [user, loading, viewMode, activeModule]);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      console.log('User is authenticated, switching to dashboard');
      setViewMode('dashboard');
    } else if (!loading && !user) {
      console.log('User is not authenticated, showing landing page');
      setViewMode('landing');
    }
  }, [user, loading]);

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleStartDemo = () => {
    if (user) {
      setViewMode('dashboard');
    } else {
      navigate('/auth');
    }
  };

  // Placeholder components for missing modules
  const PlaceholderModule = ({ title }: { title: string }) => (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">This module is coming soon!</p>
      </div>
      <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <div className="text-4xl mb-4">🚀</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Under Development</h2>
        <p className="text-gray-600">We're working hard to bring you this feature. Stay tuned for updates!</p>
      </div>
    </div>
  );

  const renderDashboardContent = () => {
    console.log('Rendering module:', activeModule);
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'launch':
        return <BusinessLaunch />;
      case 'compliance':
        return <ComplianceHub />;
      case 'operations':
        return <Operations />;
      case 'team':
        return <HRDashboard />;
      case 'marketing':
        return <Marketing />;
      case 'strategy':
        return <PlaceholderModule title="Strategy Planning" />;
      case 'analytics':
        return <PlaceholderModule title="Analytics Dashboard" />;
      case 'knowledge':
        return <KnowledgeHub />;
      case 'settings':
        return <PlaceholderModule title="Settings" />;
      case 'help':
        return <PlaceholderModule title="Help & Support" />;
      default:
        console.log('Unknown module, defaulting to dashboard:', activeModule);
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading BizCore...</p>
        </div>
      </div>
    );
  }

  if (user && viewMode === 'dashboard') {
    console.log('Rendering dashboard for user:', user.email);
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <div className="flex-1 overflow-auto">
          {renderDashboardContent()}
        </div>
        <AICopilot />
        
        {/* User indicator */}
        <div className="fixed top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg z-40">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Welcome, {user.user_metadata?.business_name || 'User'}</span>
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
  }

  console.log('Rendering landing page');
  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={handleAuthClick} />
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
            onClick={handleStartDemo}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            {user ? 'Go to Dashboard →' : 'Start Your Business Journey →'}
          </button>
          <p className="text-blue-200 text-sm mt-4">30-day free trial • No credit card required</p>
        </div>
      </section>

      <AICopilot />
    </div>
  );
};

export default Index;
