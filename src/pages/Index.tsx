
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBusinessProfile } from '@/hooks/useBusinessProfile';
import Navbar from '@/components/Navbar';
import LandingHero from '@/components/LandingHero';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingPricing from '@/components/landing/LandingPricing';
import LandingCTA from '@/components/landing/LandingCTA';
import Footer from '@/components/Footer';
import AICopilot from '@/components/AICopilot';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import UserIndicator from '@/components/dashboard/UserIndicator';
import LoadingScreen from '@/components/LoadingScreen';
import BusinessSetupForm from '@/components/onboarding/BusinessSetupForm';

const Index = () => {
  const { user, loading } = useAuth();
  const { businessProfile, loading: profileLoading } = useBusinessProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('landing'); // 'landing', 'onboarding', or 'dashboard'
  const [activeModule, setActiveModule] = useState('dashboard');

  // Debug logging
  useEffect(() => {
    console.log('Index component - user:', user);
    console.log('Index component - loading:', loading);
    console.log('Index component - businessProfile:', businessProfile);
    console.log('Index component - profileLoading:', profileLoading);
    console.log('Index component - viewMode:', viewMode);
  }, [user, loading, businessProfile, profileLoading, viewMode]);

  // Handle navigation from footer product links
  useEffect(() => {
    if (location.state?.activeModule && user && businessProfile) {
      setActiveModule(location.state.activeModule);
      setViewMode('dashboard');
      // Clear the state to prevent issues on refresh
      navigate('/', { replace: true });
    }
  }, [location.state, user, businessProfile, navigate]);

  // Determine view mode based on user and business profile status
  useEffect(() => {
    if (!loading && !profileLoading) {
      if (user) {
        if (businessProfile) {
          console.log('User has business profile, switching to dashboard');
          setViewMode('dashboard');
        } else {
          console.log('User needs to complete business setup');
          setViewMode('onboarding');
        }
      } else {
        console.log('User is not authenticated, showing landing page');
        setViewMode('landing');
      }
    }
  }, [user, loading, businessProfile, profileLoading]);

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleStartDemo = () => {
    if (user) {
      if (businessProfile) {
        setViewMode('dashboard');
      } else {
        setViewMode('onboarding');
      }
    } else {
      navigate('/auth');
    }
  };

  const handleBusinessSetupComplete = (hasExistingBusiness: boolean) => {
    console.log('Business setup completed, switching to dashboard');
    setViewMode('dashboard');
  };

  if (loading || profileLoading) {
    return <LoadingScreen />;
  }

  // Show onboarding flow for authenticated users without business profile
  if (user && viewMode === 'onboarding') {
    console.log('Rendering business setup onboarding');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="relative z-10 flex items-center justify-center p-4 min-h-screen">
          <BusinessSetupForm onComplete={handleBusinessSetupComplete} />
        </div>
      </div>
    );
  }

  // Show dashboard for authenticated users with business profile
  if (user && businessProfile && viewMode === 'dashboard') {
    console.log('Rendering dashboard for user:', user.email);
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <div className="flex-1 overflow-auto">
          <DashboardContent activeModule={activeModule} onModuleChange={setActiveModule} />
        </div>
        <AICopilot />
        <UserIndicator user={user} onExit={() => setViewMode('landing')} />
      </div>
    );
  }

  console.log('Rendering landing page');
  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={handleAuthClick} />
      <LandingHero />
      <LandingFeatures />
      <LandingPricing />
      <LandingCTA onStartDemo={handleStartDemo} user={user} />
      <Footer />
      <AICopilot />
    </div>
  );
};

export default Index;
